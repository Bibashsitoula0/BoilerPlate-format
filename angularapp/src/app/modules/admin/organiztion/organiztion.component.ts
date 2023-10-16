import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import {
    FormGroup,
    FormBuilder,
    Validators,
    UntypedFormBuilder,
    FormControl,
} from '@angular/forms';
import { environment } from 'environment/environment';
import { FuseAlertType } from '@fuse/components/alert';
import { ViewEncapsulation } from '@angular/compiler';
import { fuseAnimations } from '@fuse/animations';
import { Observable, map, startWith } from 'rxjs';
import { state } from '@angular/animations';

@Component({
    selector: 'app-organiztion',
    templateUrl: './organiztion.component.html',
    styleUrls: ['./organiztion.component.scss'],

    animations: fuseAnimations,
})
export class OrganiztionComponent implements OnInit {
    @ViewChild('search') searchTextBox: ElementRef;

    selectFormControl = new FormControl();
    searchTextboxControl = new FormControl();
    selectedValues = [];
    data: string[] = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

    filteredOptions: Observable<any[]>;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    formData: FormGroup;
    trackingLocation: boolean = false;
    siteKey: string = environment.reCaptchaSiteKey;
    public captchaResolved: boolean = false;
    showAlert: boolean = false;

    constructor(
        public readonly geolocation$: GeolocationService,
        private _formBuilder: UntypedFormBuilder
    ) {}

    ngOnInit(): void {
        this.formData = this._formBuilder.group({
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            recaptcha: ['', Validators.required],
            ethnicity_name: new FormControl('', Validators.required),
        });
        /**
         * Set filter event based on value changes
         */
        this.filteredOptions = this.searchTextboxControl.valueChanges.pipe(
            startWith<string>(''),
            map((name) => this._filter(name))
        );
        // this.ethinicities = [
        //     { key: 1, value: 'Item 1' },
        //     { key: 2, value: 'Item 2' },
        //     { key: 3, value: 'Item 3' },
        //     { key: 4, value: 'Item 4' },
        //     { key: 5, value: 'Item 5' },
        // ];
    }
    /**
     * Used to filter data based on search input
     */
    private _filter(name: string): String[] {
        const filterValue = name.toLowerCase();
        // Set selected values to retain the selected checkbox state
        this.setSelectedValues();
        this.selectFormControl.patchValue(this.selectedValues);
        let filteredList = this.data.filter(
            (option) => option.toLowerCase().indexOf(filterValue) === 0
        );
        return filteredList;
    }

    selectionChange(event) {
        if (event.isUserInput && event.source.selected == false) {
            let index = this.selectedValues.indexOf(event.source.value);
            this.selectedValues.splice(index, 1);
        }
    }

    openedChange(e) {
        // Set search textbox value as empty while opening selectbox
        this.searchTextboxControl.patchValue('');
        // Focus to search textbox while clicking on selectbox
        if (e == true) {
            this.searchTextBox.nativeElement.focus();
        }
    }

    /**
     * Clearing search textbox value
     */
    clearSearch(event) {
        event.stopPropagation();
        this.searchTextboxControl.patchValue('');
    }

    /**
     * Set selected values to retain the state
     */
    setSelectedValues() {
        console.log('selectFormControl', this.selectFormControl.value);
        if (
            this.selectFormControl.value &&
            this.selectFormControl.value.length > 0
        ) {
            this.selectFormControl.value.forEach((e) => {
                if (this.selectedValues.indexOf(e) == -1) {
                    this.selectedValues.push(e);
                }
            });
        }
    }

    onLocationToggleChange(event: any) {
        console.log('checked', event);
        this.trackingLocation = event.checked;
        if (this.trackingLocation) {
            this.geolocation$.subscribe((position) => {
                if (position) {
                    this.formData.patchValue({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                } else {
                    console.log('Error getting geolocation data.');
                }
            });
        } else {
            // Clear the form values when trackingLocation is turned off.
            this.formData.patchValue({
                latitude: '',
                longitude: '',
            });
        }
    }

    handleSuccess(captchaResponse: string) {
        console.log('response', this.formData);
        this.captchaResolved =
            captchaResponse && captchaResponse.length > 0 ? true : false;
    }
    handleReset() {
        console.log('reCAPTCHA challenge reset.');
    }
    handleExpire() {
        // Show the alert
        this.showAlert = true;
        this.formData.enable();

        // Reset the form
        this.formData.get('recaptcha').reset();
        this.alert = {
            type: 'error',
            message: 'reCAPTCHA response expired',
        };
    }
    handleLoad() {
        console.log('reCAPTCHA widget has finished loading.');
    }
    OnSubmit() {
        if (this.formData.invalid) {
            return;
        }
        console.log('valid');
    }
}
export interface ethinicity {
    key: number;
    value: string;
}
