<script>
import AuthenticationSection from "./iam/components/authentication-section.component.vue";
import {useAuthenticationStore} from "./iam/services/authentication.store.js";

export default {
  name: 'app',
  components: {AuthenticationSection},
  data() {
    return {
      drawer: false,
      items: [
        { label: 'Facturas', to: '/bills'},
        { label: 'Añadir Factura', to: '/add-bill'},
        { label: 'Ver Reporte Financiero', to: '/report'},
      ],
      notItems: [
        { label: 'Inicio', to: '/home'},
      ],
      authenticationStore: useAuthenticationStore()
    }
  },
  computed: {
    isSignedIn() {
      return this.authenticationStore.isSignedIn;
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>

<template>
  <pv-toast/>
  <header>
    <pv-toolbar class="bg-primary" fixed>
      <template #start>
        <h1>BILLETERA VIRTUAL</h1>
      </template>
      <template #end>
        <div class="flex-column" v-if="isSignedIn">
          <router-link v-for="item in items" :key="item.label" v-slot="{navigate, href}" :to="item.to" custom>
            <pv-button :href="href" class="p-button-text text-white label-button" @click="navigate">{{item.label}}</pv-button>
          </router-link>
        </div>
        <div v-else>
          <router-link v-for="item in notItems" :key="item.label" v-slot="{navigate, href}" :to="item.to" custom>
            <pv-button :href="href" class="p-button-text text-white label-button" @click="navigate">{{item.label}}</pv-button>
          </router-link>
        </div>
        <authentication-section/>
      </template>
    </pv-toolbar>
  </header>
  <pv-sidebar v-model="drawer"/>
  <router-view/>
</template>

<style scoped>
.label-button {
  font-size: 1.2rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.label-button:hover {
  background-color: #0d89ec;
}
</style>