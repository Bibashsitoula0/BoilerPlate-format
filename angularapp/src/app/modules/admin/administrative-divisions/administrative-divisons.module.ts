import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrativeDivisionsComponent } from './administrative-divisions.component';
import { Route, RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
const administrativeDivisionRoute: Route[] = [
    {
        path: '',
        component: AdministrativeDivisionsComponent,
    },
];

@NgModule({
    declarations: [AdministrativeDivisionsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(administrativeDivisionRoute),
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
    ],
})
export class AdministrativeDivisonsModule {}
