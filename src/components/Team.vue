<script setup lang="ts">
import type {TeamProps} from "~/types/team";

const props = defineProps<TeamProps>()
</script>

<template>
  <div v-for="member in team" :key="member.order"
       class="w-1/5 max-w-24 aspect-square border rounded-full mx-3">
    {{ member.pokemon?.name }}
  </div>
</template>

<style scoped>

</style>