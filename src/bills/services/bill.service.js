import http from "../../shared/services/http-common.js";

export class BillService {
    userId = localStorage.getItem('userId');

    getBills() {
        return http.get(`bills/by-user/${this.userId}`);
    }

    getBillForId(billId) {
        return http.get(`bills/${billId}`);
    }
}