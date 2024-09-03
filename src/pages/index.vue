<script setup lang="ts">
import type {Pokemon} from "pokenode-ts";

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

const startGame = () => started.value = true;

</script>
<template>
  <div class="flex-grow flex flex-col items-center w-full">
    <div class="flex-grow-0 -ml-5">
      <Logo class="max-w-80 self-center"/>
    </div>
    <div class="flex flex-grow">
      <div v-if="started" v-for="s in starterArray" :key="s.id" class="flex mx-4 self-center border rounded-full">
        <img :src="s?.sprites?.front_default as string" class=""/>
      </div>
    </div>
    <div v-if="!started" class="flex-grow content-center">
      <UiButton class="font-pixel" @click="startGame">
        <span class="animate-pulse duration-700">Start Game</span>
      </UiButton>
    </div>
  </div>
</template>