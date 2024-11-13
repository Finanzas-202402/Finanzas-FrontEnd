<script lang="ts">
import {useRouter} from "vue-router";
import BillList from "../components/bill-list.component.vue";
import {BillApiService} from "../services/bill-api.service.js";
import {Bill} from "../model/bill.entity.js";
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";

export default {
  name: "bills",
  components: {BillList},
  data() {
    return {
      router: useRouter(),
      bills: [],
      bill: {},
      billsApi: null,
      authenticationStore: useAuthenticationStore()
    }
  },
  created() {
    this.billsApi = new BillApiService();

    this.billsApi.getBills(this.currentUserId).then((response) => {
      console.log(response.data);
      let bills = response.data;
      this.bills = bills.map((bill) => Bill.toDisplayableBill(bill));
    });
  },
  computed: {
    currentUserId() {
      return this.authenticationStore.currentUserId;
    }
  }
}
</script>

<template>
  <div>
    <bill-list :bills="bills"/>
  </div>
</template>