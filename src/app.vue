<template>
  <div class="flex items-center justify-center">
    <img src="public/images/PokePick-29-08-2024.png" alt="pockepick logo" class="w-1/3 min-w-[360px] logo-animation">
  </div>
</template>
<style scoped>
.logo-animation {
  animation: growth 1s infinite;
}

@keyframes growth {
  0%, 100% {
    transform: scale(1);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  50% {
    transform: scale(102%);
    animation-timing-function: cubic-bezier(0, 0, 1, 1);
  }
}
</style>
