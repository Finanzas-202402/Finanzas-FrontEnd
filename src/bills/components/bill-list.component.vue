<script>
import BillCard from "./bill-card.component.vue";

export default {
  name: "bill-list",
  components: {BillCard},
  props: { bills: Array }
}
</script>

<template>
  <div class="card-container">
    <bill-card v-for="bill in bills" :key="bill.id" :bill="bill"/>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background-image: url('https://movypay.com/wp-content/uploads/2019/10/Fotolia_182043508_Subscription_Monthly_M.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow-y: auto;
}
</style>