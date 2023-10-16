import { Component, ViewChild, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
    CommonService,
    GiveAcessForFiscalYear,
    GiveAcessForFiscalYearDetail,
} from 'app/Service/api.client.generated';
import { MatSnackService } from 'app/Service/mat-snack.service';

@Component({
    selector: 'app-fiscalyear-access',
    templateUrl: './fiscalyear-access.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 56% 15% 20% 15% 10% 10%;

                @screen sm {
                    grid-template-columns: 56% 20% 25% 15% 10% 15%;
                }

                @screen md {
                    grid-template-columns: 15% 20% 25% 15% 10% 15%;
                }

                @screen lg {
                    grid-template-columns: 15% 20% 25% 15% 10% 15%;
                }
            }
        `,
    ],
})
export class FiscalyearAccessComponent implements OnInit {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    selectedProductForm: UntypedFormGroup;
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private commonService: CommonService,
        private matSnackBarService: MatSnackService
    ) {}
    months = [];
    quarter = [];
    dataAfterChecked = null;
    fiscalyearlist = [];
    ngOnInit(): void {
        this.commonService.getAllFiscalForChecked().subscribe({
            next: (response) => {
                const res = response;
                this.fiscalyearlist = res.data;
                console.log('fiscalyearlist', this.fiscalyearlist);
            },
        });
        this.selectedProductForm = this._formBuilder.group({
            fiscalid: [],
            months: [],
            quarter: [],
        });
    }

    selectedFiscalYearDetail = null;
    selectedFiscalYearFirstIndex: any;
    selectedFiscalyear = null;
    filteredMonths = [];
    filteredQuarters = [];
    fiscalyearname: string;
    toggleDetails(id: number, fiscalyearname: string) {
        console.log('selectedFiscalYearDetail', this.selectedFiscalYearDetail);
        this.filteredMonths = [];
        this.filteredQuarters = [];
        this.months = [];
        this.quarter = [];
        this.fiscalyearCheck = null;
        console.log('id', id);
        // If the year is already selected...
        if (
            this.selectedFiscalYearDetail &&
            this.selectedFiscalYearDetail[0].fiscal_id === id
        ) {
            // Close the details
            this.closeDetails();
            return;
        }
        this.fiscalyearname = fiscalyearname;
        this.commonService.getAllFiscalChildForChecked(id).subscribe({
            next: (response) => {
                this.selectedFiscalYearDetail = [];
                console.log('response', response);
                this.selectedFiscalYearDetail = response.data;
                this.selectedFiscalYearFirstIndex =
                    this.selectedFiscalYearDetail[0];
                this.selectedFiscalYearDetail.forEach((element) => {
                    if (element.fy_type === 'Monthly') {
                        this.filteredMonths.push(element);
                        this.months.push(element);
                    } else if (element.fy_type === 'Quarterly') {
                        this.filteredQuarters.push(element);
                        this.quarter.push(element);
                    }
                });
            },
        });
    }
    closeDetails(): void {
        this.selectedFiscalYearFirstIndex = null;
        this.selectedFiscalYearDetail = null;
    }

    /**
     * Filter tags
     *
     * @param event
     */
    filterMonths(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        //filter the months
        this.filteredMonths = this.months.filter((months) =>
            months.fydetail_name.toLowerCase().includes(value)
        );
    }
    filterQuarter(event): void {
        const value = event.target.value.toLowerCase();

        //filter the months
        this.filteredQuarters = this.quarter.filter((quarter) =>
            quarter.fydetail_name.toLowerCase().includes(value)
        );
    }
    filterTagsInputKeyDown(event) {
        const value = event.target.value.toLowerCase();
        console.log('keydown', value);
    }
    toggleMonths(tag, change: MatCheckboxChange): void {
        // If the selected months array is null, return
        if (!this.months) {
            return;
        }

        const index = this.months.findIndex(
            (month) => month.fiscal_detail_id === tag.fiscal_detail_id
        );

        if (index !== -1) {
            // If the checkbox is checked, update the selected product's months array
            if (change.checked) {
                this.months[index].locked = true;
            } else {
                // If the checkbox is unchecked, update the selected product's months array
                this.months[index].locked = false;
            }
        }
    }
    toggleQuarter(tag, change: MatCheckboxChange) {
        // If the selected  quarter  array is null, return
        if (!this.months) {
            return;
        }

        const index = this.quarter.findIndex(
            (month) => month.fiscal_detail_id === tag.fiscal_detail_id
        );

        if (index !== -1) {
            // If the checkbox is checked, update the selected product's months array
            if (change.checked) {
                this.quarter[index].locked = true;
            } else {
                // If the checkbox is unchecked, update the selected product's months array
                this.quarter[index].locked = false;
            }
        }
    }
    fiscalyearCheck: boolean;
    fiscalYearLockChange(change: MatCheckboxChange) {
        if (change.checked) {
            this.fiscalyearCheck = true;
        } else {
            this.fiscalyearCheck = false;
        }
    }
    updateSelectedFiscalYear() {
        if (this.fiscalyearCheck === null) {
            this.fiscalyearCheck = false;
        }

        let obj = {
            fiscalid: this.selectedFiscalYearDetail[0].fiscal_id,
            fy_locked: this.fiscalyearCheck,
            fiscalYearDetail: [],
        };
        // Update the 'fiscalYearDetail' array for "Monthly" details
        if (this.months) {
            const monthlyDetails = this.months.map((month) => ({
                fy_detail_id: month.fiscal_detail_id,
                fy_detail_locked: month.locked,
            }));
            obj.fiscalYearDetail = obj.fiscalYearDetail.concat(monthlyDetails);
        }

        // Update the 'fiscalYearDetail' array for "Quarterly" details
        if (this.quarter) {
            const quarterlyDetails = this.quarter.map((quarter) => ({
                fy_detail_id: quarter.fiscal_detail_id,
                fy_detail_locked: quarter.locked,
            }));
            obj.fiscalYearDetail =
                obj.fiscalYearDetail.concat(quarterlyDetails);
        }
        this.commonService.lockoutForFiscalYear(obj).subscribe({
            next: (response) => {
                console.log('response', response);
            },
        });
        console.log('obj', obj);
    }
}
