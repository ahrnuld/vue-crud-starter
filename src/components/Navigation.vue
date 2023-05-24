<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link
          >
        </li>      
        <li class="nav-item">
          <router-link to="/transfer" class="nav-link" active-class="active"
            >Transfer</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/account" class="nav-link" active-class="active"
            >Account</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/transferlist" class="nav-link" active-class="active"
            >Transfer List</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style>
</style>