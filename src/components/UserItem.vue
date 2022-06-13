<template>
  <div
    class="bg-white lg:max-w-[730px] m-4 lg:mx-auto lg:mt-11 shadow-box rounded-3xl"
  >
    <div
      class="relative mx-auto max-w-[440px] flex flex-col items-center gap-y-6 py-7 sm:pt-10 sm:pb-[3.75rem] px-4 sm:px-0"
    >
      <h3 class="text-xl sm:text-[1.5rem] leading-[1.938rem]">
        User #{{ user.id }}
      </h3>

      <div class="w-full">
        <p class="flex justify-between w-full mb-3">
          <span class="text-gray-600 text-sm leading-5">Name</span>
          <span class="font-medium leading-4">{{ fullName }}</span>
        </p>

        <p class="flex justify-between w-full">
          <span class="text-gray-600 text-sm leading-5">Color</span>
          <span class="font-medium leading-4">{{ color }}</span>
        </p>
      </div>

      <button
        class="absolute pr-4 sm:pr-0 right-0 lg:-right-[100px] hover:opacity-50 focus:opacity-50 transition-opacity"
        @click="removeUser"
      >
        <img src="@/assets/icons/trash.svg" alt="remove" />
      </button>

      <BaseButton @click="generateColor">Generate color</BaseButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import BaseButton from "../components/Base/BaseButton.vue";
import { randomColor } from "../utils/colors";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["removeUser", "updateColor"]);

const fullName = computed(() => {
  return props.user?.last_name
    ? `${props.user?.first_name} ${props.user?.last_name}`
    : props.user?.first_name;
});

const color = computed(() => {
  return props.user?.color?.toUpperCase() || "--";
});

const generateColor = () => {
  emit("updateColor", props.user, randomColor());
};

const removeUser = () => {
  emit("removeUser", props.user);
};
</script>
