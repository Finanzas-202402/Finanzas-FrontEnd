/**
 * Represents a Bill entity.
 * This class encapsulates the details of a financial bill and provides static methods
 * for converting between raw data and displayable data formats.
 */
export class Bill {
    /**
     * Creates a new instance of the Bill class.
     * @param {number} id - The unique identifier of the bill.
     * @param {string} description - A description of the bill.
     * @param {number} billValue - The total value of the bill.
     * @param {string} currency - The currency of the bill value (e.g., USD, EUR).
     * @param {string} rateType - The type of rate applied to the bill (e.g., nominal, effective).
     * @param {string} rateTime - The time frame of the rate (e.g., annual, monthly).
     * @param {string} capitalization - The capitalization frequency (e.g., monthly, quarterly).
     * @param {number} rateValue - The value of the rate applied to the bill.
     * @param {string} startDate - The start date of the bill in ISO format (YYYY-MM-DD).
     * @param {string} endDate - The end date of the bill in ISO format (YYYY-MM-DD).
     * @param {string} expirationDate - The expiration date of the bill in ISO format (YYYY-MM-DD).
     * @param {boolean} cancelled - Indicates if the bill is cancelled.
     * @param {number} userId - The ID of the user associated with the bill.
     */
    constructor(id, description, billValue, currency, rateType, rateTime, capitalization,
                rateValue, startDate, endDate, expirationDate, cancelled, userId) {
        this.id = id;
        this.description = description;
        this.billValue = billValue;
        this.currency = currency;
        this.rateType = rateType;
        this.rateTime = rateTime;
        this.capitalization = capitalization;
        this.rateValue = rateValue;
        this.startDate = startDate;
        this.endDate = endDate;
        this.expirationDate = expirationDate;
        this.cancelled = cancelled;
        this.userId = userId;
    }

    /**
     * Converts a displayable bill object into a Bill instance.
     * @param {Object} displayableBill - The displayable bill object.
     * @param {number} displayableBill.id - The unique identifier of the bill.
     * @param {string} displayableBill.description - A description of the bill.
     * @param {number} displayableBill.billValue - The total value of the bill.
     * @param {string} displayableBill.currency - The currency of the bill value.
     * @param {string} displayableBill.rateType - The type of rate applied to the bill.
     * @param {string} displayableBill.rateTime - The time frame of the rate.
     * @param {string} displayableBill.capitalization - The capitalization frequency.
     * @param {number} displayableBill.rateValue - The value of the rate applied to the bill.
     * @param {string} displayableBill.startDate - The start date of the bill in ISO format.
     * @param {string} displayableBill.endDate - The end date of the bill in ISO format.
     * @param {string} displayableBill.expirationDate - The expiration date of the bill in ISO format.
     * @param {boolean} displayableBill.cancelled - Indicates if the bill is cancelled.
     * @param {number} displayableBill.userId - The ID of the user associated with the bill.
     * @returns {Bill} - A new instance of the Bill class.
     */
    static fromDisplayableBill(displayableBill) {
        return new Bill(
            displayableBill.id,
            displayableBill.description,
            displayableBill.billValue,
            displayableBill.currency,
            displayableBill.rateType,
            displayableBill.rateTime,
            displayableBill.capitalization,
            displayableBill.rateValue,
            displayableBill.startDate,
            displayableBill.endDate,
            displayableBill.expirationDate,
            displayableBill.cancelled,
            displayableBill.userId
        );
    }

    /**
     * Converts a Bill instance into a displayable bill object.
     * @param {Bill} bill - The Bill instance to convert.
     * @returns {Object} - A displayable bill object.
     */
    static toDisplayableBill(bill) {
        return {
            id: bill.id,
            description: bill.description,
            billValue: bill.billValue,
            currency: bill.currency,
            rateType: bill.rateType,
            rateTime: bill.rateTime,
            capitalization: bill.capitalization,
            rateValue: bill.rateValue,
            startDate: bill.startDate,
            endDate: bill.endDate,
            expirationDate: bill.expirationDate,
            cancelled: bill.cancelled,
            userId: bill.userId
        };
    }
}
