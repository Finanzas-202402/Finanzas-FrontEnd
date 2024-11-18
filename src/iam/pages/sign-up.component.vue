<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";

export default {
  name: "sign-up",
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    onSignUp() {
      if (!this.email || !this.username || !this.password || !this.confirmPassword) {
        this.$toast.add({severity: 'error', summary: 'Error', detail: 'Asegúrese de completar todos los campos', life: 3000});
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.$toast.add({severity: 'error', summary: 'Error', detail: 'Las contraseñas no son iguales', life: 3000});
        return;
      }
      let authenticationStore = useAuthenticationStore();
      let signUpRequest = new SignUpRequest(this.email, this.username, this.password);
      authenticationStore.signUp(signUpRequest, this.$router)
          .then((response) => {
            this.$toast.add({severity: 'success', summary: 'Éxito', detail: 'El usuario se ha registrado con éxito', life: 3000});
          })
          .catch((error) => {
            this.$toast.add({severity: 'error', summary: 'Error', detail: 'El email ' + this.email + ' ya está en uso', life: 3000});
          });
    }
  }
}
</script>

<template>
  <div>
    <div class="full-container">
      <div class="signup-container">
        <div class="form-title">Registrarse</div>
        <form @submit.prevent="onSignUp">
          <div class="p-fluid">
            <div class="field mt-5">
              <pv-float-label>
                <label for="email">Email</label>
                <pv-input-text id="email" v-model="email" :class="{'p-invalid': !email}"/>
                <small v-if="!email" class="p-invalid error-message">Este campo es requerido</small>
              </pv-float-label>
            </div>
            <div class="field mt-5">
              <pv-float-label>
                <label for="username">Nombre</label>
                <pv-input-text id="username" v-model="username" :class="{'p-invalid': !username}"/>
                <small v-if="!username" class="p-invalid error-message">Este campo es requerido</small>
              </pv-float-label>
            </div>
            <div class="field mt-5">
              <pv-float-label>
                <label for="password">Contraseña</label>
                <pv-input-text id="password" v-model="password" :class="{'p-invalid': !password}" type="password" />
                <small v-if="!password" class="p-invalid error-message">Este campo es requerido</small>
              </pv-float-label>
            </div>
            <div class="field mt-5">
              <pv-float-label>
                <label for="confirmPassword">Confirmar contraseña</label>
                <pv-input-text id="confirmPassword" v-model="confirmPassword" :class="{'p-invalid': !confirmPassword}" type="password" />
                <small v-if="!confirmPassword" class="p-invalid error-message">Este campo es requerido</small>
              </pv-float-label>
            </div>
            <div class="field mt-5">
              <button type="submit" class="p-button p-button-primary">Registrarse</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.full-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://cdn.aarp.net/content/dam/aarp/money/credit_loans_debt/2022/05/1140-cellphone-bitcoins-digital-wallet-es.jpg');
  background-size: cover;
  background-position: center;
}

.signup-container {
  min-width: 50vh;
  min-height: 50vh;
  margin: 2rem auto 0;
  padding: 2rem;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  background: rgba(0, 0, 0, 0.8);
}

.form-title {
  font-size: 1.5rem;
  text-align: center;
  color: #2196f3;
  margin-bottom: 1rem;
}

.error-message {
  color: #f44336;
}

.field {
  text-align: center;
}

.field button {
  display: inline-block;
  width: auto;
  padding: 0.75rem 2rem;
  margin-top: 1.5rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
}

.field button:hover {
  background-color: #1e88e5;
}
</style>