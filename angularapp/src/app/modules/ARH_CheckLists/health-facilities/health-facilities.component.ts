import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService, SelectList } from 'app/Service/api.client.generated';

@Component({
    selector: 'app-health-facilities',
    templateUrl: './health-facilities.component.html',
    styleUrls: ['./health-facilities.component.scss'],
})
export class HealthFacilitiesComponent implements OnInit {
    healthFacilitiesForm: FormGroup;
    provinceList: SelectList[];
    constructor(
        private _formBuilder: FormBuilder,
        private commonService: CommonService
    ) {}
    hfList = [
        {
            key: 1,
            value: 'Pharmacy',
        },
        {
            key: 2,
            value: 'Clinic',
        },
        {
            key: 3,
            value: 'Polyclinic',
        },
        {
            key: 4,
            value: 'Hospital',
        },
    ];
    ngOnInit() {
        this.healthFacilitiesForm = this._formBuilder.group({
            id: [],
            visit_date: [],
            province_id: ['', Validators.required],
            district_id: ['', Validators.required],
            palika_id: ['', Validators.required],

            ward: ['', Validators.required],
            tole: ['', Validators.required],
            healthFacilitiy_name: ['', Validators.required],
            prioritiesWard: ['', Validators.required],
            hf_type: ['', Validators.required],
            serviceProviderName: ['', Validators.required],
            contactno: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
        });
        this.getProvince();
    }
    getProvince() {
        this.commonService.getProvince().subscribe({
            next: (response) => {
                if (response.status === 'Sucess') {
                    this.provinceList = response.data;
                } else {
                    this.provinceList = [];
                }
            },
            error: (error) => {},
        });
    }
    districtList = [];
    palikaList = [];
    onProvinceChangeForP_address(event: any) {
        this.healthFacilitiesForm.patchValue({
            district_id: null,
        });
        this.palikaList = [];
        this.commonService
            .getDistrictByProvinceIds(event.value)
            .subscribe((response) => {
                const res: any = response;
                this.districtList = res.data;
            });
    }

    onDistrictChangeForP_address(event: any) {
        this.healthFacilitiesForm.patchValue({
            palika_id: null,
        });
        this.commonService
            .getMultiplePalikaByMultipleDistrictIds(event.value)
            .subscribe((response) => {
                const res: any = response;
                this.palikaList = res.data;
            });
    }
    OnSave() {
        if (this.healthFacilitiesForm.invalid) {
            this.healthFacilitiesForm.markAllAsTouched();
            return;
        }
    }
}
