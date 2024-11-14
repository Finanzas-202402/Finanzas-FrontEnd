<script>
import { Bill } from "../model/bill.entity.js";
import {BillApiService} from "../services/bill-api.service.js";

export default {
  name: "bill-card",
  props: { bill: Bill },
  data() {
    return {
      eac: 0,
      value: 0,
      billsApi: null,
    }
  },
  computed: {
    translatedCapitalization() {
      const capitalizationTranslations = {
        "Diary": "Diaria",
        "Fortnightly": "Quincenal",
        "Monthly": "Mensual",
        "Bimonthly": "Bimestral",
        "Quarterly": "Trimestral",
        "FourMonthly": "Cuatrimestral",
        "Semiannual": "Semestral",
        "Annual": "Anual",
      };
      return capitalizationTranslations[this.bill.capitalization] || "anual";
    },
    translatedRateTime() {
      const rateTimeTranslations = {
        "Fortnightly": "Quincenal",
        "Monthly": "Mensual",
        "Bimonthly": "Bimestral",
        "Quarterly": "Trimestral",
        "FourMonthly": "Cuatrimestral",
        "Semiannual": "Semestral",
        "Annual": "Anual",
      };
      return rateTimeTranslations[this.bill.rateTime] || "anual";
    },
    formattedStartDate() {
      return this.bill.startDate.split('T')[0];
    },
    formattedEndDate() {
      return this.bill.endDate.split('T')[0];
    },
    formattedExpirationDate() {
      return this.bill.expirationDate.split('T')[0];
    }
  },
  methods: {
    onBillDetails() {
      this.$router.push({ name: 'bill-details', params: { billId: this.bill.id } });
    },
    onBillEdit() {
      this.$router.push({ name: 'edit-bill', params: { billId: this.bill.id } });
    }
  },
  created() {
    this.billsApi = new BillApiService();
    if (this.bill.cancelled) {
      this.billsApi.getBillEac(this.bill.id).then((response) => {
        console.log(response.data);
        this.eac = response.data;
      });

      this.billsApi.getBillFinalValue(this.bill.id).then((response) => {
        console.log(response.data);
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
      <div v-if="this.bill.cancelled === false">
        <p>Valor: {{ bill.billValue.toString() }} {{ bill.currency === 'Dollars' ? 'Dólares' : 'Soles' }}</p>
      </div>
      <div v-else>
        <p>Valor Inicial: {{ bill.billValue.toString() }} {{ bill.currency === 'Dollars' ? 'Dólares' : 'Soles' }}</p>
        <p>Valor Recibido: {{ this.value.toFixed(2) }} {{ bill.currency === 'Dollars' ? 'Dólares' : 'Soles' }}</p>
      </div>
      <div v-if="this.bill.cancelled === false">
        <p>{{ bill.rateType === 'Nominal' ? 'Tasa Nominal' : 'Tasa Efectiva' }} {{ translatedRateTime }}: {{ bill.rateValue }}%</p>
        <div v-if="bill.rateType === 'Nominal'">
          <p>Capitalización {{ translatedCapitalization }}</p>
        </div>
      </div>
      <p>Fecha de emisión: {{ formattedStartDate }}</p>
      <div v-if="bill.cancelled" class="expiration-message">
        <p>Fecha de descuento: {{ formattedEndDate }}</p>
      </div>
      <div v-else>
        <p class="expiration-date">Fecha de vencimiento: {{ formattedExpirationDate }}</p>
      </div>
      <div v-if="this.bill.cancelled">
        <p class="expiration-message">Tasa de Coste Efectivo Anual (TCEA) de la factura: {{ this.eac.toFixed(7) }}%</p>
      </div>
      <div v-if="bill.cancelled === false" class="form-grid">
        <pv-button class="label-button" @click="onBillEdit">Editar</pv-button>
        <pv-button class="label-button" @click="onBillDetails">Descontar</pv-button>
      </div>
      <div v-else>
        <pv-button class="label-button" @click="onBillDetails">Detalles</pv-button>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.bill-card {
  display: flex;
  width: 23%;
  height: 45%;
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

.label-button {
  margin: 1rem;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.expiration-message {
  color: lightgreen;
}

.expiration-date {
  color: red;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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