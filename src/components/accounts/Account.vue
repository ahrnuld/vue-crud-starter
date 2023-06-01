<template>
    <h1 class="text-center mt-3">Accounts</h1>
    <AccountItem v-for="account in accounts" :key="account.id" :account="account" @update="update" />
</template>
  
<script>
import axios from 'axios';
import AccountItem from './AccountItem.vue';

export default {
    name: "Account",
    components: { AccountItem },
    data() {
        return {
            accounts: [],
        }
    },
    mounted(){
        this.update();
    },
    methods: {
        update() {
            axios
                .get("https://localhost:8443/accounts/3")
                .then((result) => {
                    console.log(result);
                    this.accounts = result.data;
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>
  
<style></style>