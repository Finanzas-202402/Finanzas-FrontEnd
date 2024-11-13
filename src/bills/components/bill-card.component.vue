<script>
import { Bill } from "../model/bill.entity.js";

export default {
  name: "bill-card",
  props: { bill: Bill },
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
    formattedExpirationDate() {
      return this.bill.expirationDate.split('T')[0];
    }
  },
};
</script>

<template>
  <pv-card class="m-2 bill-card">
    <template #content>
      <h2>{{ bill.description }}</h2>
      <div>
        <p>Valor: {{ bill.billValue.toString() }} {{ bill.currency === 'Dollars' ? 'Dólares' : 'Soles' }}</p>
      </div>
      <div>
        <p>{{ bill.rateType === 'Nominal' ? 'Tasa Nominal' : 'Tasa Efectiva' }} {{ translatedRateTime }}: {{ bill.rateValue }}%</p>
        <div v-if="bill.rateType === 'Nominal'">
          <p>Capitalización {{ translatedCapitalization }}</p>
        </div>
      </div>
      <div v-if="bill.cancelled" class="expiration-message">
        <p>Descontada</p>
      </div>
      <div v-else>
        <p class="expiration-date">Fecha de vencimiento: {{ formattedExpirationDate }}</p>
      </div>
      <pv-button class="label-button" @click="">Ver Detalles</pv-button>
    </template>
  </pv-card>
</template>

<style scoped>
.bill-card {
  display: flex;
  width: 23%;
  height: 40%;
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
}

.expiration-message {
  color: lightgreen;
}

.expiration-date {
  color: red;
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