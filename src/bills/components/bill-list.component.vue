<script>
import BillCard from "./bill-card.component.vue";

export default {
  name: "bill-list",
  components: {BillCard},
  props: { bills: Array }
}

</script>

<template>
  <div v-for="bill in bills">
    <bill-card :bill="bill"/>
  </div>
</template>