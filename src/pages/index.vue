<script setup lang="ts">
import type {Pokemon} from "pokenode-ts";
import type {TeamMember} from "~/types/team";

const starterIds = [1, 4, 7];
const starterArray = ref<Pokemon[]>([])
const started = ref<boolean>(false);
const {$pokeApiClient} = useNuxtApp();

const promises = starterIds.map(async (id: number) => {
  const {data} = useAsyncData(
      `${id}`,
      async () => await $pokeApiClient.pokemon.getPokemonById(id)
  );
  return data.value as Pokemon
})

starterArray.value = await Promise.all(promises);
const team = ref<TeamMember[]>([
  {order: 1, pokemon: null,},
  {order: 2, pokemon: null,},
  {order: 3, pokemon: null,},
  {order: 4, pokemon: null,},
  {order: 5, pokemon: null,},
])
const startGame = () => started.value = true;
const addToTeam = (p: Pokemon) => {
  const t = team.value.filter(p => p.pokemon !== null)
  if (t.length < 6) team.value[t.length].pokemon = p;
};
</script>
<template>
  <div class="flex-grow flex flex-col items-center w-full">
    <div class="flex-grow-0 -ml-5">
      <Logo class="max-w-80 self-center"/>
    </div>
    <div class="flex-grow flex-wrap content-center">
      <Selection v-if="started" :pokemons="starterArray" @selection-accepted="addToTeam"/>
    </div>
    <div v-if="started" class="flex max-w-screen-lg w-full justify-center px-6 pb-6">
      <Team :team="team"/>
    </div>
    <div v-if="!started" class="flex-grow content-center">
      <UiButton class="font-pixel" @click="startGame">
        <span class="animate-pulse duration-700">Start Game</span>
      </UiButton>
    </div>
  </div>
</template>