<script lang="ts">
import { defineComponent } from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "home",
  data() {
    return {
      router: useRouter()
    }
  },
  methods: {
    startNow() {
      this.router.push({name: "sign-in"});
    }
  }
});
</script>

<template>
  <div class="home-container">
    <div class="content">
      <h1>TU PROPIA BILLETERA VIRTUAL PARA ADMINISTRAR FACTURAS</h1>
      <p>¡Regístrate y comienza a disfrutar de los beneficios!</p>
      <pv-button class="label-button" @click="startNow">Empezar ahora</pv-button>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://movypay.com/wp-content/uploads/2019/10/Fotolia_182043508_Subscription_Monthly_M.jpg');
  background-size: cover;
  background-position: center;
}

.content {
  max-width: 80vh;
  margin: 2rem auto 0;
  padding: 2rem;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
}

h1 {
  font-size: 3em;
  margin: 0;
}

p {
  font-size: 1.2em;
  margin: 10px 0;
}

.label-button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 50px;
  cursor: pointer;
  margin: 10px 0;
}

.label-button:hover {
  background-color: #0d89ec;
}
</style>
