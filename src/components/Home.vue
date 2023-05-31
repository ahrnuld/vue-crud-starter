<template>
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Banking app Overview</h2>
    </div>
  </section>
</template>

<script>
import { useUserSessionStore } from "../stores/usersession.js";

export default {
  name: "Home",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {
    if (!useUserSessionStore().isAuthenticated) {
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>