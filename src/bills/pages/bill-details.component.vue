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
      billId: this.$route.params.billId,
      billsApi: null,
      bills: [],
      bill: {},
      authenticationStore: useAuthenticationStore(),

      endDate: '',
      eac: 0,
      value: 0,
    }
  },
  methods: {
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
    },
    findIndexById(id) {
      return this.bills.findIndex((bill) => bill.id === id);
    },
    updateBill() {
      if (new Date(this.endDate) >= new Date(this.bill.expirationDate)) {
        this.$toast.add({severity: 'error', summary: 'Error', detail: 'La fecha de descuento no puede ser posterior a la fecha de vencimiento.', life: 3000});
        return;
      }

      if (new Date(this.endDate) <= new Date(this.bill.startDate)) {
        this.$toast.add({severity: 'error', summary: 'Error', detail: 'La fecha de descuento no puede ser anterior a la fecha de emisión.', life: 3000});
        return;
      }

      this.bill.endDate = this.endDate;
      this.bill.cancelled = true;
      this.bill = Bill.fromDisplayableBill(this.bill);
      this.billsApi
          .update(this.bill.id, this.bill)
          .then((response) => {
            this.bills[this.findIndexById(response.data.id)] =
                Bill.toDisplayableBill(response.data);
            this.$toast.add({severity: 'success', summary: 'Éxito', detail: 'Se ha registrado el descuento de la factura con éxito', life: 3000});
            this.router.push({name: "bills"});
          });
    },
    onReturn() {
      this.router.push({name: "bills"});
    }
  },
  created() {
    this.billsApi = new BillApiService();

    this.billsApi.getBillForId(this.billId).then((response) => {
      let bill = response.data;
      this.bill = Bill.toDisplayableBill(bill);

      if (this.bill.cancelled) {
        this.billsApi.getBillEac(this.bill.id).then((response) => {
          this.eac = response.data;
        });

        this.billsApi.getBillFinalValue(this.bill.id).then((response) => {
          this.value = response.data;
        });
      }
    });
  },
}
</script>

<template>
  <div class="full-container">
    <div class="bill-container">
      <h1>{{ this.bill.description }}</h1>
      <div>
        <h3 v-if="this.bill.cancelled === false" class="bill-value">
          Valor: {{ this.bill.billValue.toString() }}
          {{ this.bill.currency === 'Dollars' ? 'Dólares' : 'Soles' }}
        </h3>
        <h3 v-else class="bill-value">
          Valor Recibido: {{ this.value.toFixed(2) }}
          {{ this.bill.currency === 'Dollars' ? 'Dólares' : 'Soles' }}
        </h3>
        <h2 v-if="this.bill.cancelled" class="bill-value">
          Valor Inicial: {{ this.bill.billValue.toString() }}
          {{ this.bill.currency === 'Dollars' ? 'Dólares' : 'Soles' }}
        </h2>
      </div>
      <div class="p-fluid">
        <p class="rate-text">
          {{ this.bill.rateType === 'Nominal' ? 'Tasa Nominal' : 'Tasa Efectiva' }}
          {{ translatedRateTime() }}: {{ this.bill.rateValue }}%
        </p>
        <div v-if="this.bill.rateType === 'Nominal'">
          <p class="capitalization">Capitalización {{ translatedCapitalization() }}</p>
        </div>
      </div>
      <p class="rate-text">Fecha de emisión: {{ formattedStartDate() }}</p>
      <div v-if="this.bill.cancelled">
        <p class="rate-text">Fecha de vencimiento original: {{ formattedExpirationDate() }}</p>
      </div>
      <div v-if="this.bill.cancelled" class="expiration-message">
        <p>Fecha de descuento: {{ formattedEndDate() }}</p>
      </div>
      <div v-else>
        <p class="expiration-date">Fecha de vencimiento: {{ formattedExpirationDate() }}</p>
      </div>
      <div v-if="this.bill.cancelled">
        <p class="expiration-message">Tasa de Coste Efectivo Anual (TCEA) de la factura: {{ this.eac.toFixed(7) }}%</p>
      </div>
      <form v-if="this.bill.cancelled === false" @submit.prevent="updateBill">
        <div class="field mt-5">
          <pv-float-label>
            <p>Fecha de descuento de la factura</p>
            <pv-input-text id="endDate" v-model="endDate" :class="{'p-invalid': !endDate}" type="datetime-local"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <button type="submit" class="p-button p-button-primary">Descontar Factura</button>
        </div>
      </form>
      <form v-else>
        <div class="field mt-5">
          <pv-button class="label-button" @click="onReturn">Regresar</pv-button>
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
  flex-wrap: wrap;
  gap: 1rem;
  background-image: url('https://movypay.com/wp-content/uploads/2019/10/Fotolia_182043508_Subscription_Monthly_M.jpg');
  background-size: cover;
  background-position: center;
  padding: 2rem;
  background-attachment: fixed;
  overflow-y: auto;
}

.bill-container {
  min-width: 60vh;
  min-height: 60vh;
  margin: 2rem auto;
  padding: 3rem;
  border: 1px solid #d1d1d1;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
  background: rgba(0, 0, 0, 0.75);
  color: whitesmoke;
  text-align: center;
  max-width: 800px;
}

.bill-container h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.bill-value {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.rate-text {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.capitalization {
  font-size: 1.3rem;
  color: lightgray;
}

.expiration-message {
  color: lightgreen;
  font-size: 1.5rem;
  font-weight: bold;
}

.expiration-date {
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .bill-container {
    width: 90%;
    min-width: unset;
  }

  .bill-container h1 {
    font-size: 2rem;
  }

  .bill-value {
    font-size: 1.5rem;
  }

  .rate-text, .capitalization, .expiration-message, .expiration-date {
    font-size: 1.2rem;
  }
}
</style>
