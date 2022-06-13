<template>
  <div
    v-if="isLoading"
    class="mx-auto loader w-20 h-20 rounded-full border-8 border-green-500 border-t-transparent animate-spin"
  ></div>
  <slot v-else></slot>
</template>

<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
});
</script>
