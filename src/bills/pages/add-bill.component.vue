<script>
import {useRouter} from "vue-router";
import {BillApiService} from "../services/bill-api.service.js";
import {Bill} from "../model/bill.entity.js";
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";

export default {
  name: "add-bill",
  data() {
    return {
      router: useRouter(),
      bills: [],
      bill: {},
      billsApi: null,
      authenticationStore: useAuthenticationStore(),

      description: '',
      billValue: 0,
      currency: 'Soles',
      currencyOptions: [
        { label: 'Soles', value: 'Soles' },
        { label: 'Dólares', value: 'Dollars' }
      ],
      rateType: 'Nominal',
      rateTypeOptions: [
        { label: 'Nominal', value: 'Nominal' },
        { label: 'Efectiva', value: 'Effective' }
      ],
      rateTime: 'Fortnightly',
      rateTimeOptions: [
        { label: 'Quincenal', value: 'Fortnightly' },
        { label: 'Mensual', value: 'Monthly' },
        { label: 'Bimestral', value: 'Bimonthly' },
        { label: 'Trimestral', value: 'Quarterly' },
        { label: 'Cuatrimestral', value: 'FourMonthly' },
        { label: 'Semestral', value: 'Semiannual' },
        { label: 'Anual', value: 'Annual' }
      ],
      capitalization: 'Diary',
      capitalizationOptions: [
        { label: 'Diaria', value: 'Diary' },
        { label: 'Quincenal', value: 'Fortnightly' },
        { label: 'Mensual', value: 'Monthly' },
        { label: 'Bimestral', value: 'Bimonthly' },
        { label: 'Trimestral', value: 'Quarterly' },
        { label: 'Cuatrimestral', value: 'FourMonthly' },
        { label: 'Semestral', value: 'Semiannual' },
        { label: 'Anual', value: 'Annual' }
      ],
      rateValue: 0,
      startDate: '',
      endDate: '',
      expirationDate: '',
    }
  },
  computed: {
    currentUserId() {
      return this.authenticationStore.currentUserId;
    }
  },
  created() {
    this.billsApi = new BillApiService();
  },
  methods: {
    createBill() {
      if (!this.description || !this.billValue || !this.currency || !this.rateType ||
          !this.rateTime || !this.rateValue || !this.startDate || !this.expirationDate) {
        this.$toast.add({severity: 'error', summary: 'Error', detail: 'Asegúrese de completar todos los campos', life: 3000});
        return;
      }

      if (new Date(this.expirationDate) < new Date(this.startDate)) {
        this.$toast.add({severity: 'error', summary: 'Error', detail: 'La fecha de expiración no puede ser anterior a la fecha de inicio', life: 3000});
        return;
      }

      this.bill.id = 0;
      this.bill.description = this.description;
      this.bill.billValue = this.billValue;
      this.bill.currency = this.currency.value;
      this.bill.rateType = this.rateType.value;
      this.bill.rateTime = this.rateTime.value;
      this.bill.capitalization = this.capitalization.value;
      this.bill.rateValue = this.rateValue;
      this.bill.startDate = this.startDate;
      this.bill.expirationDate = this.expirationDate;
      this.bill.cancelled = false;
      this.bill.userId = this.currentUserId;
      this.bill = Bill.fromDisplayableBill(this.bill);
      this.billsApi.create(this.bill)
          .then((response) => {
            this.bill = Bill.toDisplayableBill(response.data);
            this.bills.push(this.bill);
            this.$toast.add({severity: 'success', summary: 'Éxito', detail: 'La factura se ha añadido con éxito', life: 3000});
            this.router.push({name: "bills"});
          });
    },
  }
}
</script>

<template>
  <div class="full-container">
    <div class="new-bill-container">
      <div class="form-title">Crear nueva factura</div>
      <form @submit.prevent="createBill">
        <div class="field mt-5">
          <pv-float-label>
            <p>Descripción de la factura</p>
            <pv-input-text id="description" v-model="description" :class="{'p-invalid': !description}"/>
          </pv-float-label>
        </div>
        <div class="p-fluid form-grid">
          <div class="field mt-5">
            <pv-float-label>
              <p>Valor de la factura</p>
              <pv-input-text id="billValue" v-model="billValue" :class="{'p-invalid': !billValue}" type="number"/>
            </pv-float-label>
          </div>
          <div class="field mt-5">
            <pv-float-label>
              <p>Moneda</p>
              <pv-dropdown id="currency" v-model="currency" :options="currencyOptions" optionLabel="label" :class="{'p-invalid': !currency}" />
            </pv-float-label>
          </div>
          <div class="field mt-5">
            <pv-float-label>
              <p>Tipo de la tasa</p>
              <pv-dropdown id="rateType" v-model="rateType" :options="rateTypeOptions" optionLabel="label" :class="{'p-invalid': !rateType}" />
            </pv-float-label>
          </div>
          <div class="field mt-5">
            <pv-float-label>
              <p>Tiempo de la tasa</p>
              <pv-dropdown id="rateTime" v-model="rateTime" :options="rateTimeOptions" optionLabel="label" :class="{'p-invalid': !rateTime}" />
            </pv-float-label>
          </div>
          <div class="field mt-5">
            <pv-float-label>
              <p>Capitalización</p>
              <pv-dropdown id="capitalization" v-model="capitalization" :options="capitalizationOptions" optionLabel="label" :class="{'p-invalid': !capitalization}" />
            </pv-float-label>
          </div>
          <div class="field mt-5">
            <pv-float-label>
              <p>Valor de la tasa</p>
              <pv-input-text id="rateValue" v-model="rateValue" :class="{'p-invalid': !rateValue}" type="number"/>
            </pv-float-label>
          </div>
        </div>
        <div class="p-fluid form-grid-2">
          <div class="field mt-5">
            <pv-float-label>
              <p>Fecha de emisión de la factura</p>
              <pv-input-text id="startDate" v-model="startDate" :class="{'p-invalid': !startDate}" type="datetime-local"/>
            </pv-float-label>
          </div>
          <div class="field mt-5">
            <pv-float-label>
              <p>Fecha de expiración de la factura</p>
              <pv-input-text id="expirationDate" v-model="expirationDate" :class="{'p-invalid': !expirationDate}" type="datetime-local" :min="startDate"/>
            </pv-float-label>
          </div>
        </div>
        <div class="field mt-5">
          <button type="submit" class="p-button p-button-primary">Crear Factura</button>
        </div>
      </form>
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

.new-bill-container {
  min-width: 50vh;
  min-height: 50vh;
  padding: 2rem;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  background: rgba(0, 0, 0, 0.8);
  color: lightgray;
  text-align: center;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-title {
  font-size: 1.5rem;
  text-align: center;
  color: #2196f3;
  margin-bottom: 1rem;
}

#description {
  width: 50rem;
}
</style>