export class Bill {
    constructor(id, billValue, currency, rateType, rateTime, capitalization,
                rateValue, startDate, endDate, expirationDate, cancelled, userId) {
        this.id = id;
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
}