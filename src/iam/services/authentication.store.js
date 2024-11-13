import {AuthenticationService} from "./authentication.service.js";
import {defineStore} from "pinia";
import {SignInResponse} from "../model/sign-in.response.js";
import {SignUpResponse} from "../model/sign-up.response.js";

const authenticationService = new AuthenticationService();

/**
 * Authentication store definition
 * @summary
 * This store is used to manage the user authentication state.
 * It provides getters to access the current user id, username, and token.
 * It also provides actions to sign in, sign up, and sign out.
 */
export const useAuthenticationStore = defineStore({
    id: 'authentication',
    state: () => ({ signedIn: false, userId: 0, username: '', email: ''}),
    getters: {
        /**
         * Check if the user is signed in
         * @param state - The current state
         * @returns {boolean} - True if the user is signed in, false otherwise
         */
        isSignedIn: (state) => state['signedIn'],
        /**
         * Get the current user id
         * @param state - The current state
         * @returns {number} - The current user id
         */
        currentUserId: (state) => state['userId'],
        /**
         * Get the current username
         * @param state - The current state
         * @returns {string} - The current username
         */
        currentUsername: (state) => state['username'],
        /**
         * Get the current email
         * @param state - The current state
         * @returns {string} - The current email
         */
        currentEmail: (state) => state['email'],
        /**
         * Get the current token
         * @returns {string} - The current token
         */
        currentToken: () => localStorage.getItem('token')
    },
    actions: {
        /**
         * Sign in the user
         * @param signInRequest - The sign in request
         * @param router - The router instance
         */
        async signIn(signInRequest, router) {
            authenticationService.signIn(signInRequest)
                .then(response => {
                    let signInResponse = new SignInResponse(response.data.id, response.data.token, response.data.username);
                    this.signedIn = true;
                    this.userId = signInResponse.id;
                    localStorage.setItem('token', signInResponse.token);
                    this.username = signInResponse.username;
                    console.log(signInResponse);
                    router.push({name: 'bills'});
                })
                .catch(error => {
                    console.error(error);
                    router.push({name: 'sign-in'});
                });
        },

        /**
         * Sign up the user
         * @param signUpRequest - The sign-up request containing the username and password
         * @param router - The router instance
         * @returns {Promise<SignUpResponse>}
         */
        async signUp(signUpRequest, router) {
            return authenticationService.signUp(signUpRequest)
                .then(response => {
                    let signUpResponse = new SignUpResponse(response.data.message);
                    console.log(signUpResponse);
                    router.push({name: 'sign-in'});
                    return signUpResponse;
                })
                .catch(error => {
                    console.error(error);
                    router.push({name: 'sign-up'});
                    throw error;
                });
        },

        /**
         * Sign out the user
         * @param router - The router instance
         * @returns {Promise<void>}
         */
        async signOut(router) {
            this.signedIn = false;
            this.userId = 0;
            this.email = '';
            this.username = '';
            localStorage.removeItem('token');
            router.push({name: 'sign-in'});
        }
    }
})