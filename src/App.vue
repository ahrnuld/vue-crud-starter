<script>
import Navigation from './components/Navigation.vue'

export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>

<template>
   <navigation />
   <RouterView />
</template>

<style scoped>
</style>
