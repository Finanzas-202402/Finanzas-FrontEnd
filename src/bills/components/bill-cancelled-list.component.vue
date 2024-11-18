<script>
import BillCancelledCardComponent from "./bill-cancelled-card.component.vue";

export default {
  name: "bill-list",
  components: {BillCancelledCardComponent},
  props: { bills: Array }
}
</script>

<template>
  <div class="card-container">
    <bill-cancelled-card-component v-for="bill in bills" :key="bill.id" :bill="bill"/>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background-image: url('https://cdn.aarp.net/content/dam/aarp/money/credit_loans_debt/2022/05/1140-cellphone-bitcoins-digital-wallet-es.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow-y: auto;
}
</style>