<template>
  <label class="text-gray-900 w-[416px] max-w-full relative">
    <span v-if="label" class="block mb-1 text-sm leading-[18px]">
      {{ label }}
    </span>

    <div class="input-container flex relative">
      <input
        :value="modelValue"
        @input="inputHandler"
        v-bind="$attrs"
        type="text"
        class="flex-1 w-0 mr-4 pl-3 pr-8 py-[11px] leading-[22px] rounded bg-gray-200 focus:bg-white placeholder:text-gray-600 border-2 hover:border-gray-900 focus:border-gray-900 focus:outline-none transition-colors"
        :class="{ 'border-red-500 focus:border-red-500': isInvalid }"
      />
      <img
        v-if="isRequired"
        src="@/assets/icons/star.svg"
        class="text-red-500 -ml-2"
      />
      <button
        v-if="!isEmpty"
        @click="clearInput"
        class="absolute top-1/2 -translate-y-1/2 right-6 p-2 z-10 cursor-pointer hidden"
      >
        <img src="@/assets/icons/close.svg" />
      </button>
    </div>

    <span v-if="isInvalid" class="block mt-1 ml-3 text-xs text-red-500">
      {{ errorMessage }}
    </span>
  </label>
</template>

<script setup>
import { computed } from "@vue/reactivity";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },

  errorMessage: {
    type: String,
    default: "",
  },

  isRequired: {
    type: Boolean,
    default: false,
  },

  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isEmpty = computed(() => props.modelValue === "");
const isInvalid = computed(() => props.errorMessage !== "");

const clearInput = () => {
  emit("update:modelValue", "");
};

const inputHandler = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<style lang="scss" scoped>
.input-container:focus-within {
  button {
    display: block;
  }
}
</style>
