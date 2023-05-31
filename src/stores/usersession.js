import { defineStore } from 'pinia'
import axios from '../axios_auth.js';
import useEmitter from '../emitter.js'

export const useUserSessionStore = defineStore('usersession', {
    state: () => ({
        access_token: '',
        refresh_token: '',
        user_id: 0,
        expiresAt: 0,
        user: {}
    }),
    getters: {
        isAuthenticated: (state) => state.access_token !== '',
        getUserId: (state) => state.user_id,
    },
    actions: {
        localLogin() {
            if (!localStorage['access_token'] || !localStorage['refresh_token'] || !localStorage['expiresAt'].length || !localStorage['id'].length) {
                return;
            }

            this.access_token = localStorage['access_token'];
            this.refresh_token = localStorage['refresh_token'];
            this.user_id = localStorage['id'];
            this.expiresAt = localStorage['expiresAt'];

            if (Date.now() > this.expiresAt) {
                // Try to refresh.
                this.refresh()
            }

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.access_token;
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
                        this.user_id = response.data.id;
                        this.expiresAt = response.data.expiresAt;

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.access_token;
                        localStorage['access_token'] = this.access_token;
                        localStorage['refresh_token'] = this.refresh_token;
                        localStorage['id'] = response.data.id;
                        localStorage['expiresAt'] = response.data.expiresAt;

                        useEmitter().emit('login', this.user_id);
                        resolve();
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log(error.response.data.error_message);
                        reject(error.response.data.error_message);
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

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.access_token;
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
        },
        getUser() {
            return new Promise((resolve, reject) => {
                if (this.user != {}) {
                    resolve(this.user);
                }

                axios
                    .get("/users/" + this.user_id)
                    .then((response) => {
                        this.user = response.data;
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error.response.data.errorMessage);
                    });
            });
        }
    }
})
