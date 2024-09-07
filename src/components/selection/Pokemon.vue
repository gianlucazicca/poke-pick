<script setup lang="ts">
import type {PokemonSelectionProps} from "~/types/pokemonSelection";

const props = defineProps<PokemonSelectionProps>();

defineEmits(["selection"]);

const pokemonType = computed(() => {
  if (props.pokemon) return props.pokemon?.types[0].type.name
  return ''
});
const styles = [
  'relative',
  'flex',
  'self-center',
  'before:overflow-hidden',
  'before:content-[attr(data-before-type)]',
  'before:absolute',
  'before:flex',
  'before:font-pixel',
  'before:font-bold',
  'before:tracking-wider',
  'before:items-center',
  'before:justify-center',
  'before:px-2',
  'before:pt-1',
  'before:pb-2',
  'before:rounded-full',
  'before:text-sm',
  'before:left-1/2',
  'before:-translate-x-1/2',
  'before:transition-all',
  'before:duration-500',
];

const getStyles = computed(() => {
  const mStyles = styles;
  switch (pokemonType.value) {
    case 'grass':
      mStyles.push('before:bg-green-200/80', 'before:text-green-600');
      break;
    case 'fire':
      mStyles.push('before:bg-red-200/80', 'before:text-red-600');
      break;
    case 'water':
      mStyles.push('before:bg-blue-200/80', 'before:text-blue-600');
      break;
    default:
      mStyles.push('');
      break;
  }
  return mStyles;
});

</script>

<template>
  <button
      :data-before-type="pokemonType"
      :class="[getStyles, props.isSelected ? 'before:opacity-100 before:top-3/4' : 'before:opacity-0 hover:before:opacity-100 before:top-full hover:before:top-3/4']"
      @click="() => $emit('selection',props.pokemon.id)">
    <img :src="props.pokemon?.sprites?.front_default as string" class="size-40 mx-2 md:mx-4"
         :class="{'selectedPokemon': props.isSelected}"/>
  </button>
</template>

<style scoped>
.selectedPokemon {
  animation: wiggle 800ms ease-in-out infinite 100ms;
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(-15deg);
  }
  75% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>