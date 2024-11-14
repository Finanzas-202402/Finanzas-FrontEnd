<script>
import { Bill } from "../model/bill.entity.js";
import {BillApiService} from "../services/bill-api.service.js";

export default {
  name: "bill-cancelled-card",
  props: { bill: Bill },
  data() {
    return {
      eac: 0,
      value: 0,
      billsApi: null,
    }
  },
  computed: {
    formattedStartDate() {
      return this.bill.startDate.split('T')[0];
    },
    formattedEndDate() {
      return this.bill.endDate.split('T')[0];
    },
  },
  created() {
    this.billsApi = new BillApiService();
    if (this.bill.cancelled) {
      this.billsApi.getBillEac(this.bill.id).then((response) => {
        this.eac = response.data;
      });

      this.billsApi.getBillFinalValue(this.bill.id).then((response) => {
        this.value = response.data;
      });
    }
  },
};
</script>

<template>
  <pv-card class="m-2 bill-card">
    <template #content>
      <h2>{{ bill.description }}</h2>
      <p class="expiration-message">Valor Recibido: {{ this.value.toFixed(2) }} {{ bill.currency === 'Dollars' ? 'Dólares' : 'Soles' }}</p>
      <p>Fecha de emisión: {{ formattedStartDate }}</p>
      <p>Fecha de descuento: {{ formattedEndDate }}</p>
      <p class="expiration-message">Tasa de Coste Efectivo Anual (TCEA) de la factura: {{ this.eac.toFixed(7) }}%</p>
    </template>
  </pv-card>
</template>

<style scoped>
.bill-card {
  display: flex;
  width: 23%;
  height: 40vh;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  background: rgba(0, 0, 0, 0.8);
  color: white;
}
.expiration-message {
  color: lightgreen;
}

@media (max-width: 1200px) {
  .bill-card {
    width: 30%;
  }
}

@media (max-width: 992px) {
  .bill-card {
    width: 45%;
  }
}

@media (max-width: 768px) {
  .bill-card {
    width: 100%;
  }
}
</style>