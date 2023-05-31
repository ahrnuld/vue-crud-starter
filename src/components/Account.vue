<template>
    <section>
        <div class="container">
            <h2 class="mt-3 mt-lg-5">Account overview</h2>
        </div>
        <div>
            <h3>This is your personal account info:</h3>
            <br>
            <p>Account number: 123456789</p>
            <p>Account holder: John Doe</p>
            <p>Account balance(total): 2000</p>
            <p>Account balance(saving): 1000</p>
            <p>Account balance(credit): 1000</p>
        </div>
    </section>
</template>

<script>
import { useUserSessionStore } from "../stores/usersession.js";

export default {
    name: "Account",
    mounted() {
        if (!useUserSessionStore().isAuthenticated) {
            this.$router.push("/login");
        }
    }
};
</script>

<style></style>