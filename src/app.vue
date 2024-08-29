<script setup lang="ts">
import {Button} from "~/components/ui/button";

const {$pokeApiClient} = useNuxtApp();

const {data: pokemon, error} = useAsyncData(
    'pokemon',
    async () => await $pokeApiClient.pokemon.getPokemonById(1)
);
</script>
<template>
  <div class="bg-main-image">
    <Logo class="max-w-80 mx-auto my-8"/>
    <img v-if="!error" :src="pokemon?.sprites.front_default as string" alt="pockepick logo"
         class="w-[120px] logo-animation">
  </div>
</template>

