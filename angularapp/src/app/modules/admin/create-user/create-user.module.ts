import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    AccountService,
    CommonService,
} from 'app/Service/api.client.generated';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateuserDialogComponent } from './createuser-dialog/createuser-dialog.component';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { ChangeuserpasswordComponent } from '../changeuserpassword/changeuserpassword.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
const createuserRoutes: Route[] = [
    {
        path: '',
        component: CreateUserComponent,
    },
];
@NgModule({
    declarations: [
        CreateUserComponent,
        CreateuserDialogComponent,
        ChangeuserpasswordComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(createuserRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        ReactiveFormsModule,
        FuseCardModule,
        FuseAlertModule,
        MatSnackBarModule,
    ],
    providers: [AccountService],
    entryComponents: [CreateuserDialogComponent, ChangeuserpasswordComponent],
})
export class CreateUserModule {}
