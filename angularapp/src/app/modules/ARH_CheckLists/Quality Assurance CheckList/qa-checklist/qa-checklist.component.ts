import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import {
    MatAutocomplete,
    MatAutocompleteModule,
    MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonService, SelectList } from 'app/Service/api.client.generated';
import { MatSnackService } from 'app/Service/mat-snack.service';
import { state } from '@angular/animations';
import { ViewEncapsulation } from '@angular/core';
import { environment } from 'environment/environment';
import { GeolocationService } from '@ng-web-apis/geolocation';
@Component({
    selector: 'app-qa-checklist',
    templateUrl: './qa-checklist.component.html',
    styleUrls: ['./qa-checklist.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class QaChecklistComponent implements OnInit {
    private formStartTime: Date;
    private formEndTime: Date;
    horizontalStepperForm: FormGroup;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    trackingLocation: boolean = false;
    siteKey: string = environment.reCaptchaSiteKey;
    public captchaResolved: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private commonService: CommonService,
        private matsnackService: MatSnackService,
        public readonly geolocation$: GeolocationService
    ) {}
    provinceList: SelectList[];
    myControl = new FormControl('');
    filteredProvince: Observable<SelectList[]>;

    ngOnInit() {
        this.formStartTime = new Date();
        this.horizontalStepperForm = this._formBuilder.group({
            id: [],
            privatesector_officername: ['', Validators.required],
            test: [''],
            visit_date: [],
            province_id: ['', Validators.required],
            district_id: ['', Validators.required],
            palika_id: ['', Validators.required],
            ward: ['', Validators.required],
            tole: ['', Validators.required],
            province: new FormControl('', Validators.required),
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
        });

        this.getProvince();
    }
    // ngAfterViewInit() {
    //     // Attach the (optionSelected) event handler to the mat-autocomplete element
    //     this.matAutocomplete.optionSelected.subscribe(
    //         (event: MatAutocompleteSelectedEvent) => {
    //             this.onOptionSelected(event);
    //         }
    //     );
    // }

    onOptionSelected(event: MatAutocompleteSelectedEvent) {
        const selectedOptionValue = event.option.value;
        // Add your desired logic here, using the selected option value
        console.log('Selected option value:', selectedOptionValue);
        // Call your method or perform any other action you want here
    }
    test() {
        // Set up the filteredProvince observable using the 'province' form control
        this.filteredProvince = this.horizontalStepperForm
            .get('province')
            .valueChanges.pipe(
                startWith(''),
                map((province) =>
                    province
                        ? this._filteredProvince(province)
                        : this.provinceList.slice()
                )
            );
        console.log('list', this.provinceList);
    }
    private _filteredProvince(value: string): SelectList[] {
        const filterValue = value.toString().toLowerCase();

        return this.provinceList.filter(
            (state) => state.value.toLowerCase().indexOf(filterValue) === 0
        );
    }

    getProvince() {
        this.commonService.getProvince().subscribe({
            next: (response) => {
                if (response.status === 'Sucess') {
                    this.provinceList = response.data;
                } else {
                    this.matsnackService.matSnackBarFail(response.message);
                    this.provinceList = [];
                }
            },
            error: (error) => {
                this.matsnackService.matSnackBarFail(error.message);
            },
        });
    }

    onLocationToggleChange(event: any) {
        console.log('checked', event);
        this.trackingLocation = event.checked;
        if (this.trackingLocation) {
            console.log('qqqqq');
            this.geolocation$.subscribe((position) => {
                if (position) {
                    this.horizontalStepperForm.patchValue({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                } else {
                    console.log('Error getting geolocation data.');
                }
            });
        } else {
            console.log('sssssssss');
            // Clear the form values when trackingLocation is turned off.
            this.horizontalStepperForm.patchValue({
                latitude: '',
                longitude: '',
            });
        }
    }
    districtList = [];
    palikaList = [];
    onProvinceChangeForP_address(event: any) {
        this.horizontalStepperForm.patchValue({
            district_id: null,
        });
        this.districtList = [];
        this.palikaList = [];
        this.commonService
            .getDistrictByProvinceIds(event.target.value)
            .subscribe((response) => {
                const res: any = response;
                this.districtList = res.data;
            });
    }

    onDistrictChangeForP_address(event: any) {
        this.horizontalStepperForm.patchValue({
            palika_id: null,
        });
        this.palikaList = [];
        this.commonService
            .getMultiplePalikaByMultipleDistrictIds(event.target.value)
            .subscribe((response) => {
                const res: any = response;
                this.palikaList = res.data;
            });
    }
    onSave() {
        console.log('formcontrol', this.horizontalStepperForm);
        this.formEndTime = new Date();
        const timeTakenInSeconds =
            (this.formEndTime.getTime() - this.formStartTime.getTime()) / 1000;
        console.log(
            `Time taken to submit the form: ${timeTakenInSeconds} seconds`
        );
    }
}
