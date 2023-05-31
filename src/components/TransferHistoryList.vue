<template>
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Transfer History</h2>
    </div>
    <div>
      <ol class="list-group list-group-numbered">
        <TransferHistoryItem v-for="transfer in transfera" :key="transfer.id" :transfer="transfer"></TransferHistoryItem>
      </ol>
    </div>
  </section>
</template>

<script>
import { useUserSessionStore } from "../stores/usersession.js";

export default {
  name: "TransferHistoryList",
  components: {
    TransferHistoryItem,
  },
  data() {
    return {
      products: [],
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