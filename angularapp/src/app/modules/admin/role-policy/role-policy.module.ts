import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePolicyComponent } from './role-policy.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationService } from 'app/Service/api.client.generated';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuseCardModule } from '@fuse/components/card';
const rolePolicyRoute: Route[] = [
    {
        path: '',
        component: RolePolicyComponent,
    },
];
@NgModule({
    declarations: [RolePolicyComponent],
    imports: [
        RouterModule.forChild(rolePolicyRoute),
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,

        MatDialogModule,
        MatToolbarModule,
        // GenGridModule,
        // GenSearchModule,
        MatTooltipModule,
        ReactiveFormsModule,
        FormsModule,
        FuseCardModule,
    ],
    providers: [NavigationService],
})
export class RolePolicyModule {}
