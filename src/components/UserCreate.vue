<template>
  <form class="flex flex-col items-center gap-y-6 pt-5 pb-7 px-4">
    <h3 class="text-[1.625rem] lg:text-[2rem] sm:leading-[2.625rem]">
      Create user
    </h3>
    <BaseInput
      v-model="form.name.value"
      :error-message="form.name.errorMessage"
      label="Full Name"
      is-required
      @blur="form.name.isTouched = true"
    />
    <BaseInput
      v-model="form.job.value"
      :error-message="form.job.errorMessage"
      label="Job"
      placeholder="leader"
      is-required
      @blur="form.job.isTouched = true"
    />

    <BaseButton @click="submitHandler">Submit</BaseButton>
  </form>
</template>

<script setup>
import { reactive, computed, watch, defineEmits } from "vue";
import BaseInput from "../components/Base/BaseInput.vue";
import BaseButton from "../components/Base/BaseButton.vue";
import { requiredError, lengthError } from "../utils/validators";
import { createUser } from "../services/users";

const emit = defineEmits(["createUser"]);

const form = reactive({
  name: {
    value: "",
    errorMessage: "",
    isTouched: false,
    validators: [requiredError, lengthError(5, 15)],
  },
  job: {
    value: "",
    errorMessage: "",
    isTouched: false,
    validators: [requiredError, lengthError(5, 15)],
  },
});

const validateField = (field) => {
  field.errorMessage = null;

  field?.validators.forEach((validator) => {
    if (field.errorMessage) return;
    field.errorMessage = validator(field.value, field.label);
  }, null);
};

const isFormInvalid = computed(() => {
  return form.name.errorMessage || form.job.errorMessage;
});

watch(
  () => [form.name.value, form.name.isTouched],
  () => {
    if (form.name.isTouched) validateField(form.name);
  }
);
watch(
  () => [form.job.value, form.job.isTouched],
  () => {
    if (form.job.isTouched) validateField(form.job);
  }
);

const clearForm = () => {
  form.name.value = "";
  form.name.isTouched = false;
  form.job.value = "";
  form.job.isTouched = false;
};

const submitHandler = async () => {
  form.name.isTouched = true;
  form.job.isTouched = true;
  validateField(form.name);
  validateField(form.job);

  if (isFormInvalid.value) return;

  const preparedForm = {
    name: form.name.value,
    job: form.job.value,
  };

  try {
    const createdUser = await createUser(preparedForm);
    emit("createUser", createdUser);
    clearForm();
  } catch (e) {
    alert(e.message);
  }
};
</script>

<style lang="scss" scoped></style>
