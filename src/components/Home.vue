<template>
  <section>
    <div class="container">
      <div class="row">
        <h2 class="mt-3 mt-lg-5">Welcome, {{ user?.firstname }}</h2>
      </div>
      <div v-if="user?.current_account == null && user?.saving_account == null && user?.role === 'USER'">
        <div class="card">
          <p>Sorry, you must wait for an employee to open your account.</p>
        </div>
      </div>
      <div v-else>
        <div class="row my-4">
          <div class="card">
            <h3 class="d-inline">Total Balance</h3>
            <h4 class="fw-bold d-inline">{{ user?.total_balance }} {{ currencySymbol }}</h4>
          </div>
        </div>
        <div class="row my-2 gx-4">
          <div class="col px-0">
            <div class="card p-2" v-if="user?.current_account != null">
              <h3>Current Account</h3>
              <p>{{ user?.current_account.IBAN }}</p>
              <h4 class="fw-bold">{{ user?.current_account.balance }} {{ currencySymbol }}</h4>
            </div>
          </div>
          <div class="col" v-if="user?.saving_account != null">
            <div class="card p-2">
              <h3>Saving Account</h3>
              <p>{{ user?.saving_account.IBAN }}</p>
              <h4 class="fw-bold">{{ user?.saving_account.balance }} {{ currencySymbol }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUserSessionStore } from "../stores/usersession.js";

export default {
  name: "Home",
  data() {
    return {
      user: null,
      // EUR
      currencySymbol: "\u20AC"
    };
  },
  mounted() {
    if (!useUserSessionStore().isAuthenticated) {
      this.$router.push("/login");
    }

    useUserSessionStore().getUser().then(user => {
      this.user = user;
    });
  },
};
</script>

<style></style>