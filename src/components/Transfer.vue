<template>
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Transfer money</h2>
    </div>
    <form>
      <div class="mb-3">
        <label for="from_account" class="form-label">Select Account</label>
        <select id="from_account" class="form-select">
          <option>Cedit account</option>
          <option>Saving account</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="to_iban" class="form-label">Pay to</label>
        <input type="text" class="form-control" id="to_iban" placeholder="e.g IBAN 1234 5677 5789">
      </div>
      <div class="mb-3">
        <label for="amount" class="form-label">Amount</label>
        <input type="text" class="form-control" id="amount" placeholder="e.g 1000">
      </div>
      <button type="submit" class="btn btn-primary">Send money</button>
    </form>
  </section>
</template>

<script>
import { useUserSessionStore } from "../stores/usersession.js";

export default {
  name: "Transfer",
  mounted() {
    if (!useUserSessionStore().isAuthenticated) {
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>