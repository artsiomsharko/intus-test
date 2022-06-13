<template>
  <div
    class="bg-white lg:max-w-[730px] mx-3 lg:mx-auto lg:mb-[106px] mt-[42px] shadow-box rounded-3xl"
  >
    <form class="flex flex-col items-center gap-y-6 pt-5 pb-7 px-4">
      <h2 class="text-[1.625rem] lg:text-[2rem] sm:leading-[2.625rem]">
        Create user
      </h2>

      <BaseInput
        v-model="form.name.value"
        :error-message="form.name.errorMessage"
        label="Full Name"
        required
        @blur="form.name.isTouched = true"
      />
      <BaseInput
        v-model="form.job.value"
        :error-message="form.job.errorMessage"
        label="Job"
        placeholder="leader"
        required
        @blur="form.job.isTouched = true"
      />

      <BaseButton @click="submitHandler">Submit</BaseButton>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from "vue";
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
  Object.keys(form).forEach((key) => {
    form[key].value = "";
    form[key].isTouched = false;
    form[key].errorMessage = null;
  });
};

const submitHandler = async () => {
  Object.keys(form).forEach((key) => {
    form[key].isTouched = true;
    validateField(form[key]);
  });

  if (isFormInvalid.value) return;

  const preparedForm = {
    name: form.name.value,
    job: form.job.value,
  };

  try {
    clearForm();
    const createdUser = await createUser(preparedForm);
    emit("createUser", createdUser);
  } catch (e) {
    alert(e.message);
  }
};
</script>

<style lang="scss" scoped></style>
