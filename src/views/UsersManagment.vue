<template>
  <div class="container mx-auto">
    <div class="lg:max-w-[730px] mx-3 lg:mx-auto shadow-box rounded-3xl mt-11">
      <form class="flex flex-col items-center gap-y-6 py-7 px-4">
        <h3 class="title-1">Create user</h3>
        <BaseInput v-model="username" label="Full Name" is-required />
        <BaseInput v-model="job" label="Job" placeholder="leader" is-required />
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import { ref } from "vue";

const username = ref("");
const job = ref("");
</script>
