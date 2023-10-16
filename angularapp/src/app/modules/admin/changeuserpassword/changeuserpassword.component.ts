import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    Inject,
} from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-changeuserpassword',
    templateUrl: './changeuserpassword.component.html',
    styleUrls: ['./changeuserpassword.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ChangeuserpasswordComponent {
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
    userData: any;
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private accountService: AccountService,
        private dialog: MatDialogRef<ChangeuserpasswordComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.userData = data.userData;
    }
    ngOnInit(): void {
        // Create the form
        this.resetPasswordForm = this._formBuilder.group(
            {
                newpassword: [
                    '',
                    [Validators.required, Validators.pattern('^.{6,}$')],
                ],
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
        if (this.resetPasswordForm.invalid) {
            return;
        }
        // Disable the form
        this.resetPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        let newpassword = this.resetPasswordForm.value.newpassword;
        let confirmnewpassword =
            this.resetPasswordForm.value.newpasswordConfirm;
        this.accountService
            .changeUserPassword(
                this.userData.user_name,
                '',
                newpassword,
                confirmnewpassword
            )
            .subscribe({
                next: (response) => {
                    if (response.status === 'Sucess') {
                        this.alert = {
                            type: 'success',
                            message: response.message,
                        };
                        this.dialog.close(response);
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
