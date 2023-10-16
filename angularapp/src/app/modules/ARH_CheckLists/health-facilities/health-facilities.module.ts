import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatSelectModule } from '@angular/material/select';
import { HealthFacilitiesComponent } from './health-facilities.component';

const healthFacilityRoute: Route[] = [
    {
        path: '',
        component: HealthFacilitiesComponent,
    },
];
@NgModule({
    declarations: [HealthFacilitiesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(healthFacilityRoute),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        NgFor,
        AsyncPipe,
        MatCardModule,
        MatButtonModule,
        MatStepperModule,
        MatDatepickerModule,
        MatChipsModule,
        MatIconModule,
        MatSlideToggleModule,
        NgxCaptchaModule,
        MatSelectModule,
    ],
})
export class HealthFacilitiesModule {}
