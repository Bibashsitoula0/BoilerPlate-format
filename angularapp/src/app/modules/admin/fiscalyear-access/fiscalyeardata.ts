export class MonthQuarterData {
    months = [];
    quarters = [];

    constructor() {
        this.months = [
            [
                { id: 1, value: 'January', checked: true },
                { id: 2, value: 'February', checked: false },
                { id: 3, value: 'March', checked: true },
                { id: 4, value: 'April', checked: false },
                { id: 5, value: 'May', checked: true },
                { id: 6, value: 'June', checked: false },
                { id: 7, value: 'July', checked: true },
                { id: 8, value: 'August', checked: false },
                { id: 9, value: 'September', checked: true },
                { id: 10, value: 'October', checked: false },
                { id: 11, value: 'November', checked: true },
                { id: 12, value: 'December', checked: false },
            ],
        ];
        this.quarters = [
            { id: 1, value: 'Q1', checked: false },
            { id: 2, value: 'Q2', checked: false },
            { id: 3, value: 'Q3', checked: false },
            { id: 4, value: 'Q4', checked: false },
        ];
    }
}
