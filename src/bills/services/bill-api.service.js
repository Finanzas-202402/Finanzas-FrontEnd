import http from "../../shared/services/http-common.js";

export class BillApiService {
    getBills(userId) {
        return http.get(`/bills/by-user/${userId}`);
    }

    getBillForId(billId) {
        return http.get(`/bills/${billId}`);
    }

    create(billResource) {
        return http.post('/bills', billResource);
    }
}