<script setup lang="ts">
import {ref, computed} from 'vue'
import type {Pokemon, Type} from "pokenode-ts"
import {useGame} from "~/composables/useGame"
import {usePokeApi} from "~/composables/usePokeApi"

const {state, init, start, addToTeam} = useGame()
const pokeApi = usePokeApi()
const optionArray = ref<Pokemon[]>([])
const typeArray = ref<Type[]>([])
const randomArray = ref<Pokemon[]>([])

const fetchPokemonById = async (id: number) => {
  const {data} = await useAsyncData(
      `pokemon-${id}`,
      () => pokeApi.pokemon.getPokemonById(id)
  )
  return data.value as Pokemon
}

const fetchTypeByName = async (name: string) => {
  const {data} = await useAsyncData(
      `type-${name}`,
      () => pokeApi.pokemon.getTypeByName(name)
  )
  return data.value as Type
}

const getStarter = async () => {
  optionArray.value = await Promise.all(state.value.starterIds.map(fetchPokemonById))
}

const getTypes = async () => {
  typeArray.value = await Promise.all(state.value.types.map(fetchTypeByName))
}

const getRandomPokemon = async (type: Type): Promise<Pokemon> => {
  const randomPokemon = type.pokemon[Math.floor(Math.random() * type.pokemon.length)]
  return await $fetch(randomPokemon.pokemon.url)
}

const randomPokemonPerType = async () => {
  const pokemonPromises = typeArray.value.map(async (type) => {
    let rndP: Pokemon
    do {
      rndP = await getRandomPokemon(type)
    } while (rndP.sprites.front_default === null)
    return rndP
  })
  randomArray.value = await Promise.all(pokemonPromises)
  return randomArray.value
}

const npcPokemonSelection = async (): Promise<Pokemon> => {
  const npcPokemonOptions = await randomPokemonPerType()
  return npcPokemonOptions[Math.floor(Math.random() * 3)]
}

const initializeGame = async () => {
  init()
  state.value.loading = true
  await Promise.all([getStarter(), getTypes()])
  state.value.loading = false
}

await initializeGame()

const pokemonPickedCount = computed(() => state.value.team.filter(p => p.pokemon !== null).length)

const handleAddToTeam = async () => {
  const [npcPokemon, newOptions] = await Promise.all([
    npcPokemonSelection(),
    randomPokemonPerType()
  ])
  addToTeam(npcPokemon, 'npc')
  addToTeam(state.value.selectedPokemon)
  optionArray.value = newOptions
}
</script>

<template>
  <div class="grid max-w-full grid-cols-3 md:grid-cols-6 grid-h content-center px-4 gap-4"
       :class="state.running ? 'grid-rows-3' : 'grid-rows-1'">
    <div class="col-span-full row-span-1 content-center m-auto">
      <Logo class="max-w-72"/>
      <UiButton v-if="!state.running" class="font-pixel w-full mt-5" @click="start()">
        <span class="animate-pulse duration-700">Start Game</span>
      </UiButton>
    </div>
    <div v-if="state.running" class="col-span-full row-span-1 content-center m-auto">
      <Selection :pokemons="optionArray"/>
    </div>
    <div v-if="state.running" class="col-span-full flex items-center">
      <Team :team="state.team"/>
    </div>
    <div v-if="state.running" class="col-span-full flex items-center">
      <Team :team="state.npcTeam"/>
    </div>
    <div class="col-span-full row-span-1 content-center">
      <UiButton v-if="state.running && pokemonPickedCount < 6"
                class="font-pixel group w-full"
                :disabled="!state.selectedPokemon"
                @click="handleAddToTeam">
        <span class="group-enabled:animate-pulse duration-700">Next ></span>
      </UiButton>
      <UiButton v-else-if="state.running" class="font-pixel group w-full">
        <span class="group-enabled:animate-pulse duration-700">Start</span>
      </UiButton>
    </div>
  </div>
</template>

<style scoped>
.grid-h {
  height: calc(100vh - 50px);
}
</style>