<script>
import { useUserSessionStore } from './stores/usersession'
import Navigation from './components/Navigation.vue'

export default {
  name: "App",
  components: {
    Navigation
  },
  mounted() {
    useUserSessionStore().localLogin();
  },
};
</script>

<template>
  <navigation />
  <RouterView />
</template>

<style scoped></style>
