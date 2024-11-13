<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {useRouter} from "vue-router";

export default {
  name: "authentication-section",
  data() {
    return {
      router: useRouter(),
      authenticationStore: useAuthenticationStore()
    }
  },
  computed: {
    isSignedIn() {
      return this.authenticationStore.isSignedIn;
    },
    currentUsername() {
      return this.authenticationStore.currentUsername;
    }
  },
  methods: {
    onSignIn() {
      this.router.push({name: "sign-in"});
    },
    onSignUp() {
      this.router.push({name: "sign-up"});
    },
    onSignOut() {
      this.authenticationStore.signOut(this.router);
    }
  }
}
</script>

<template>
  <div>
    <div v-if="isSignedIn">
      <span class="p-button label-button"> Bienvenido, {{ currentUsername }} </span>
      <pv-button class="label-button" @click="onSignOut">Cerrar sesión</pv-button>
    </div>
    <div v-else>
      <pv-button class="label-button" @click="onSignIn">Iniciar sesión</pv-button>
      <pv-button class="label-button" @click="onSignUp">Registrarse</pv-button>
    </div>
  </div>
</template>

<style scoped>
.label-button {
  font-size: 1.2rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>