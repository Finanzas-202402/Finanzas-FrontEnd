import http from "../../shared/services/http-common.js";

export class BillApiService {
    getBills(userId) {
        return http.get(`/bills/by-user/${userId}`);
    }

    getCancelledBills(userId) {
        return http.get(`/bills/by-cancelled/${userId}/true`);
    }

    getBillForId(billId) {
        return http.get(`/bills/${billId}`);
    }

    getBillFinalValue(billId) {
        return http.get(`/bills/get-value/${billId}`);
    }

    getBillEac(billId) {
        return http.get(`/bills/get-eac/${billId}`);
    }

    create(billResource) {
        return http.post('/bills', billResource);
    }

    update(id, billResource) {
        return http.put(`/bills/${id}`, billResource);
    }

    delete(billId) {
        return http.delete(`/bills/${billId}`);
    }

}