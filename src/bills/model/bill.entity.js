export class Bill {
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
        )
    }

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