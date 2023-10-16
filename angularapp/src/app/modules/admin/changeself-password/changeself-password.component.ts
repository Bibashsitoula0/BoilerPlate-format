import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    NgForm,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AccountService } from 'app/Service/api.client.generated';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'app-changeself-password',
    templateUrl: './changeself-password.component.html',
    styleUrls: ['./changeself-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ChangeselfPasswordComponent implements OnInit {
    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    resetPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;
    status: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private accountService: AccountService,
        private dialog: MatDialogRef<ChangeselfPasswordComponent>
    ) {}
    ngOnInit(): void {
        // Create the form
        this.resetPasswordForm = this._formBuilder.group(
            {
                oldpassword: ['', Validators.required],
                newpassword: ['', Validators.required],
                newpasswordConfirm: ['', Validators.required],
            },
            {
                validators: FuseValidators.mustMatch(
                    'newpassword',
                    'newpasswordConfirm'
                ),
            }
        );
    }
    resetPassword() {
        this.status = true;
        if (this.resetPasswordForm.invalid) {
            return;
        }
        // Disable the form
        this.resetPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;
        let oldpassword = this.resetPasswordForm.value.oldpassword;
        let newpassword = this.resetPasswordForm.value.newpassword;
        let confirmnewpassword =
            this.resetPasswordForm.value.newpasswordConfirm;
        this.accountService
            .changePassword(oldpassword, newpassword, confirmnewpassword)
            .subscribe({
                next: (response) => {
                    if (response.status === 'Sucess') {
                        this.alert = {
                            type: 'success',
                            message: response.message,
                        };

                        // Show the alert
                        this.showAlert = true;
                        this.resetPasswordForm.enable();
                        this.resetPasswordNgForm.resetForm();
                    } else {
                        this.alert = {
                            type: 'error',
                            message: response.message,
                        };

                        // Show the alert
                        this.showAlert = true;
                        this.resetPasswordForm.enable();
                        this.resetPasswordNgForm.resetForm();
                    }
                },
                error: (error) => {},
            });
    }
    closeDialog() {
        this.dialog.close();
    }
}
