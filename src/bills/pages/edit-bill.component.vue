<script>
import {useRouter} from "vue-router";
import {BillApiService} from "../services/bill-api.service.js";
import {Bill} from "../model/bill.entity.js";
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";

export default {
  name: "edit-bill",
  data() {
    return {
      router: useRouter(),
      billId: this.$route.params.billId,
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

    this.billsApi.getBillForId(this.billId).then((response) => {
      console.log(response.data);
      let bill = response.data;
      this.bill = Bill.toDisplayableBill(bill);

      this.description = this.bill.description;
      this.billValue = this.bill.billValue;
      this.currency = this.currencyOptions.find(option => option.value === this.bill.currency);
      this.rateType = this.rateTypeOptions.find(option => option.value === this.bill.rateType);
      this.rateTime = this.rateTimeOptions.find(option => option.value === this.bill.rateTime);
      this.capitalization = this.capitalizationOptions.find(option => option.value === this.bill.capitalization);
      this.rateValue = this.bill.rateValue;
      this.startDate = this.bill.startDate;
      this.expirationDate = this.bill.expirationDate;
    });
  },
  methods: {
    updateBill() {
      if (!this.description || !this.billValue || !this.currency || !this.rateType ||
          !this.rateTime || !this.rateValue || !this.startDate || !this.expirationDate) {
        this.$toast.add({severity: 'error', summary: 'Error', detail: 'Asegúrese de completar todos los campos', life: 3000});
        return;
      }

      if (new Date(this.expirationDate) < new Date(this.startDate)) {
        this.$toast.add({severity: 'error', summary: 'Error', detail: 'La fecha de expiración no puede ser anterior a la fecha de inicio', life: 3000});
        return;
      }

      this.bill.description = this.description;
      this.bill.billValue = this.billValue;
      this.bill.currency = this.currency.value;
      this.bill.rateType = this.rateType.value;
      this.bill.rateTime = this.rateTime.value;
      this.bill.capitalization = this.capitalization.value;
      this.bill.rateValue = this.rateValue;
      this.bill.startDate = this.startDate;
      this.bill.expirationDate = this.expirationDate;

      this.bill = Bill.fromDisplayableBill(this.bill);
      this.billsApi
          .update(this.bill.id, this.bill)
          .then((response) => {
            this.$toast.add({severity: 'success', summary: 'Éxito', detail: 'La factura se ha modificado con éxito', life: 3000});
            this.router.push({name: "bills"});
            this.bills[this.findIndexById(response.data.id)] = Bill.toDisplayableBill(response.data);
          });
    },
    deleteBill() {
      this.billsApi.delete(this.billId)
          .then(() => {
            this.bills = this.bills.filter((t) => t.id !== this.bill.id);
            this.bill = {};
            this.$toast.add({severity: 'success', summary: 'Éxito', detail: 'La factura se ha eliminado con éxito', life: 3000});
            this.router.push({name: "bills"});
          });
    }
  }
}
</script>

<template>
  <div class="full-container">
    <div class="new-bill-container">
      <div class="form-title">Editar factura</div>
      <form @submit.prevent="updateBill">
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
        <div class="field mt-5 form-grid-button">
          <button type="submit" class="p-button p-button-primary">Guardar Cambios</button>
          <button class="p-button p-button-primary delete-button" @click="deleteBill">Eliminar Factura</button>
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
  background-image: url('https://movypay.com/wp-content/uploads/2019/10/Fotolia_182043508_Subscription_Monthly_M.jpg');
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

.form-grid-button {
  display: flex;
  gap: 30vh;
  justify-content: center;
  align-items: center;
}

.delete-button {
  background-color: #f44336;
  border-color: #f44336;
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