<script setup lang="ts">
import type {TeamProps} from "~/types/team";

const props = defineProps<TeamProps>()
</script>

<template>
  <div class="w-full flex justify-center flex-wrap gap-x-2 p-3">
    <div v-for="member in team" :key="member.order" class="w-full max-w-[70px]">
      <div class="relative w-full aspect-square group overflow-hidden">
        <transition name="out">
          <img v-if="member.pokemon === null" src="/images/poke-ball.png"
               class="absolute size-10/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square z-50"
               alt="poke-ball"/>
        </transition>
        <transition name="in">
          <img v-if="member.pokemon !== null" :src="member.pokemon?.sprites?.front_default as string"
               class="absolute size-full aspect-square z-40 delay-200" :alt="member.pokemon?.name"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.out-enter-active,
.out-leave-active {
  transition: all 0.5s ease;
}

.out-enter-from,
.out-leave-to {
  transform: scale(0);
  opacity: 0;
}

.in-enter-active,
.in-leave-active {
  transition: all 0.5s ease;
}

.in-enter-from {
  transform: scale(0);
  opacity: 0;
}

.in-leave-to {
  transform: scale(1.5);
  opacity: 1;
}
</style>