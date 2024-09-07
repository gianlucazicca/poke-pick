<script setup lang="ts">
import type {SelectionProps} from "~/types/pokemonSelection";

const props = defineProps<SelectionProps>();
const selectedPokemonId = ref<number>(0);
const emit = defineEmits(["selectionAccepted"])
const handleSelection = (id: number) => {
  selectedPokemonId.value = id
};

const handleNext = () => {
  emit('selectionAccepted', props.pokemons.find((p) => p.id === selectedPokemonId.value));
  selectedPokemonId.value = 0
};
</script>

<template>
  <div class="md:flex mb-10">
    <SelectionPokemon v-for="pokemon in props.pokemons" :pokemon="pokemon" :key="pokemon.id"
                      :is-selected="selectedPokemonId === pokemon.id" @selection="handleSelection"/>
  </div>
  <div class="flex justify-center">
    <UiButton class="font-pixel transition-all duration-200"
              :class="selectedPokemonId !== 0 ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'"
              @click="handleNext"
    >
      <span class="animate-pulse duration-1000">Next</span>
    </UiButton>
  </div>

</template>

<style scoped>

</style>