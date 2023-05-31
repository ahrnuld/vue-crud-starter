import { defineStore } from 'pinia'
import axios from '../axios_auth.js';
import useEmitter from '../emitter.js'

export const useUserSessionStore = defineStore('usersession', {
    state: () => ({
        access_token: '',
        refresh_token: '',
        username: '',
        expiresAt: 0
    }),
    getters: {
        isAuthenticated: (state) => state.access_token !== '',
        getUsername: (state) => state.username
    },
    actions: {
        localLogin() {
            if (!localStorage['access_token'] || !localStorage['refresh_token'] || !localStorage['expiresAt'].length || !localStorage['username'].length) {
                return;
            }

            this.access_token = localStorage['access_token'];
            this.refresh_token = localStorage['refresh_token'];
            this.username = localStorage['username'];
            this.expiresAt = localStorage['expiresAt'];

            if (Date.now() > this.expiresAt) {
                // Try to refresh.
                this.refresh()
            }

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        },
        login(username, password) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/auth/login", {
                        username: username,
                        password: password,
                    })
                    .then((response) => {
                        this.access_token = response.data.access_token;
                        this.refresh_token = response.data.refresh_token;
                        this.username = response.data.username;
                        this.expiresAt = response.data.expiresAt;

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
                        localStorage['access_token'] = this.access_token;
                        localStorage['refresh_token'] = this.refresh_token;
                        localStorage['username'] = response.data.username;
                        localStorage['expiresAt'] = response.data.expiresAt;

                        useEmitter().emit('login', response.data.username);

                        resolve();
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log(error.response.data.error_message);
                    });
            });
        },
        logout() {
            this.access_token = '';
            this.refresh_token = '';
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axios.defaults.headers.common['Authorization'] = '';
        },
        refresh() {
            return new Promise((resolve, reject) => {
                axios
                    .post("/auth/refresh", {
                        refresh_token: this.refresh_token
                    })
                    .then((response) => {
                        this.access_token = response.data.access_token;
                        this.refresh_token = response.data.refresh_token;
                        this.expiresAt = response.data.expiresAt;

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
                        localStorage['access_token'] = this.access_token;
                        localStorage['refresh_token'] = this.refresh_token;
                        localStorage['expiresAt'] = this.expiresAt;

                        resolve();
                    }
                    )
                    .catch((error) => {
                        this.logout();
                        reject(error.response.data.errorMessage);
                    }
                    );
            });
        }
    }
})
