<script setup lang="ts">
import type {SelectionProps} from "~/types/pokemonSelection";
import type {Pokemon} from "pokenode-ts";

const {state} = useGame();
const props = defineProps<SelectionProps>();
const handleSelection = (value: Pokemon) => {
  state.value.selectedPokemon = value;
};
</script>

<template>
  <div class="flex gap-x-4 mb-10 justify-center">
    <SelectionPokemon v-if="!state.loading" v-for="pokemon in props.pokemons" :pokemon="pokemon"
                      :key="pokemon.id"
                      :is-selected="state.selectedPokemon?.id === pokemon.id" @selection="handleSelection"/>
    <img v-else src="/images/poke-ball.png" class="animate-pulse duration-700 size-full"/>
  </div>
</template>

<style scoped>

</style>