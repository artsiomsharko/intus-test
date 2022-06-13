<template>
  <div class="container mx-auto mb-5 lg:mb-11">
    <UserCreate @create-user="addUser" />

    <BaseLoader :is-loading="isDataLoading">
      <UserItem
        v-for="user in users"
        :key="user.id"
        :user="user"
        @remove-user="removeUser"
        @update-color="updateColor"
      />
    </BaseLoader>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import UserCreate from "../components/UserCreate.vue";
import UserItem from "../components/UserItem.vue";
import BaseLoader from "../components/Base/BaseLoader.vue";
import { getUsers } from "@/services/users";

const users = ref([]);
const isDataLoading = ref(false);

const fetchUsers = async () => {
  isDataLoading.value = true;
  try {
    const response = await getUsers();
    users.value = await response.data;
  } catch (e) {
    alert(e.message);
  } finally {
    isDataLoading.value = false;
  }
};

const removeUser = ({ id }) => {
  users.value = users.value.filter((user) => user.id !== id);
};

const updateColor = ({ id }, color) => {
  const idx = users.value.findIndex((user) => user.id === id);
  users.value[idx].color = color;
};

const addUser = (user) => {
  const newUser = {
    first_name: user.name,
    ...user,
  };

  users.value.push(newUser);
};

onMounted(() => {
  fetchUsers();
});
</script>
