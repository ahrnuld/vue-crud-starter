<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="nav" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/transfer" class="nav-link" active-class="active">Transfer</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/account" class="nav-link" active-class="active">Account</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/transferlist" class="nav-link" active-class="active">Transfer List</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <div class="d-inline" v-if="isLoggedIn">
            <li class="nav-item d-inline">
              <router-link to="/settings" class="nav-link d-inline" active-class="active">My Account ({{ this.username
              }})</router-link>
            </li>
            <li class="nav-item d-inline">
              <a class="nav-link d-inline" @click="logout">Logout</a>
            </li>
          </div>
          <div class="d-inline" v-else>
            <li class="nav-item d-inline">
              <router-link to="/register" class="nav-link d-inline" active-class="active">Register</router-link>
            </li>
            <li class="nav-item d-inline">
              <router-link to="/login" class="nav-link d-inline" active-class="active">Login</router-link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserSessionStore } from "../stores/usersession.js";
import useEmitter from '../emitter.js';

export default {
  name: "Navigation",
  data() {
    return {
      isLoggedIn: false,
      username: ""
    };
  },
  methods: {
    logout() {
      useUserSessionStore().logout();
      this.$router.push("/login");
      this.isLoggedIn = false;
    }
  },
  events: {
    login() {
      this.isLoggedIn = true;
    }
  },
  mounted() {
    useUserSessionStore().localLogin();
    this.isLoggedIn = useUserSessionStore().isAuthenticated;
    this.username = useUserSessionStore().getUsername;

    useEmitter().on("login", username => {
      this.isLoggedIn = true;
      this.username = username;
    });
  }
};
</script>

<style>
.nav-link:hover {
  cursor: pointer;
}
</style>