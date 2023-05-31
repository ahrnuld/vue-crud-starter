<template>
    <section>
        <div class="col-12 mx-auto">
            <h1 class="mx-auto text-center">InHolland Bank</h1>
            <form class="mx-auto w-100 p-2">
                <div class="form-group mx-auto col-6 col-mx-12">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" class="d-input w-100" v-model="this.username"
                        v-on:keyup-enter="login" />
                </div>
                <div class="form-group mx-auto col-6 col-mx-12">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="d-input w-100" v-model="this.password"
                        v-on:keyup-enter="login" />
                </div>
                <div class="form-group mx-auto col-6 col-mx-12">
                    <button type="button" class="btn btn-primary my-2" @click="login">Login</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import { useUserSessionStore } from "../stores/usersession.js";

export default {
    name: "LoginView",
    setup() {
        return { store: useUserSessionStore() };
    },
    data() {
        return {
            username: "",
            password: "",
            error: ""
        }
    },
    methods: {
        login() {
            this.store.login(this.username, this.password)
                .then(() => {
                    this.$router.push('/');
                })
                .catch((error) => {
                    this.error = error;
                });
        }
    },
    mounted() {
        if (this.store.isAuthenticated) {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped></style>