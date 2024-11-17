import http from "../../shared/services/http-common.js";

/**
 * Service class for managing Bill-related API requests.
 * Provides methods to interact with the backend for operations such as retrieving, creating, updating, and deleting bills.
 */
export class BillApiService {
    /**
     * Retrieve all bills for a specific user.
     * @param {number} userId - The ID of the user whose bills are to be retrieved.
     * @returns {Promise<AxiosResponse>} - A promise containing the server's response.
     */
    getBills(userId) {
        return http.get(`/bills/by-user/${userId}`);
    }

    /**
     * Retrieve all cancelled bills for a specific user.
     * @param {number} userId - The ID of the user whose cancelled bills are to be retrieved.
     * @returns {Promise<AxiosResponse>} - A promise containing the server's response.
     */
    getCancelledBills(userId) {
        return http.get(`/bills/by-cancelled/${userId}/true`);
    }

    /**
     * Retrieve the details of a specific bill by its ID.
     * @param {number} billId - The ID of the bill to retrieve.
     * @returns {Promise<AxiosResponse>} - A promise containing the server's response.
     */
    getBillForId(billId) {
        return http.get(`/bills/${billId}`);
    }

    /**
     * Retrieve the final value of a specific bill by its ID.
     * @param {number} billId - The ID of the bill to retrieve the final value for.
     * @returns {Promise<AxiosResponse>} - A promise containing the server's response with the final value.
     */
    getBillFinalValue(billId) {
        return http.get(`/bills/get-value/${billId}`);
    }

    /**
     * Retrieve the Effective Annual Cost (EAC) for a specific bill by its ID.
     * @param {number} billId - The ID of the bill to retrieve the EAC for.
     * @returns {Promise<AxiosResponse>} - A promise containing the server's response with the EAC.
     */
    getBillEac(billId) {
        return http.get(`/bills/get-eac/${billId}`);
    }

    /**
     * Create a new bill resource.
     * @param {Object} billResource - The bill data to create.
     * @returns {Promise<AxiosResponse>} - A promise containing the server's response.
     */
    create(billResource) {
        return http.post('/bills', billResource);
    }

    /**
     * Update an existing bill resource by its ID.
     * @param {number} id - The ID of the bill to update.
     * @param {Object} billResource - The updated bill data.
     * @returns {Promise<AxiosResponse>} - A promise containing the server's response.
     */
    update(id, billResource) {
        return http.put(`/bills/${id}`, billResource);
    }

    /**
     * Delete a bill resource by its ID.
     * @param {number} billId - The ID of the bill to delete.
     * @returns {Promise<AxiosResponse>} - A promise containing the server's response.
     */
    delete(billId) {
        return http.delete(`/bills/${billId}`);
    }
}
