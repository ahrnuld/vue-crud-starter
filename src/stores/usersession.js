import { defineStore } from 'pinia'
import axios from '../axios_auth.js';
import useEmitter from '../emitter.js'

export const useUserSessionStore = defineStore('usersession', {
    state: () => ({
        access_token: '',
        refresh_token: '',
        user_id: 0,
        expires_at: 0,
        user: null
    }),
    getters: {
        isAuthenticated: (state) => state.access_token !== '',
        getUserId: (state) => state.user_id,
    },
    actions: {
        localLogin() {
            if (!localStorage['access_token'] || !localStorage['refresh_token'] || !localStorage['expires_at'].length || !localStorage['id'].length) {
                return;
            }

            this.access_token = localStorage['access_token'];
            this.refresh_token = localStorage['refresh_token'];
            this.user_id = localStorage['id'];
            this.expires_at = localStorage['expires_at'];

            if (Date.now() > this.expires_at) {
                console.log('Token expired at. Trying to refresh.');
                this.refresh();
                return;
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
                        this.expires_at = response.data.expires_at;

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.access_token;
                        localStorage['access_token'] = this.access_token;
                        localStorage['refresh_token'] = this.refresh_token;
                        localStorage['id'] = response.data.id;
                        localStorage['expires_at'] = response.data.expires_at;

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
                        this.expires_at = response.data.expires_at;

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.access_token;
                        localStorage['access_token'] = this.access_token;
                        localStorage['refresh_token'] = this.refresh_token;
                        localStorage['expires_at'] = this.expires_at;

                        console.log('Refreshed token.');

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
            if (Date.now() > this.expires_at) {
                console.log('Token expired at. Trying to refresh.');
                this.refresh()
            }

            return new Promise((resolve, reject) => {
                if (this.user != null) {
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
