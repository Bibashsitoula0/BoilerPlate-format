import { Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarModule,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class MatSnackService {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(private _snackBar: MatSnackBar) {}

    matSnackBarSuccess(value: string) {
        this._snackBar.open(value, 'Ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar'],
        });
    }
    matSnackBarFail(value: string) {
        this._snackBar.open(value, 'Error', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar'],
        });
    }
}
