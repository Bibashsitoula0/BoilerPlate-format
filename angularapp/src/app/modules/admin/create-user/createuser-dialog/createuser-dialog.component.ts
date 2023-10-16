import {
    Component,
    Inject,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import {
    AccountService,
    CommonService,
    ResponseOfListOfSelectListModel,
    SelectListModel,
} from 'app/Service/api.client.generated';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'app-createuser-dialog',
    templateUrl: './createuser-dialog.component.html',
    styleUrls: ['./createuser-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CreateuserDialogComponent implements OnInit {
    form: UntypedFormGroup;
    formdata: any;
    action: string;
    title: string;
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    status: boolean = false;
    message: any;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    roleList: SelectListModel[];
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private accountService: AccountService,
        private dialogRef: MatDialogRef<CreateuserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.formdata = data.form;
        this.title = data.title;
        this.action = data.action;
        console.log('data', data);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        if (this.action === 'Add') {
            this.signUpForm = this._formBuilder.group({
                id: '',
                username: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern('^(?=.*?[a-z]).{5,}$'),
                    ],
                ],
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: [
                    '',
                    [Validators.required, Validators.pattern('^.{6,}$')],
                ],
                confirmpassword: [
                    '',
                    [Validators.required, confirmPasswordValidator],
                ],
                userrole: ['', Validators.required],
                isactive: [false],
            });
        }
        if (this.action === 'Edit') {
            this.signUpForm = this._formBuilder.group({
                id: this.formdata.id,
                username: [
                    this.formdata.user_name,

                    [
                        Validators.required,
                        Validators.pattern('^(?=.*?[a-z]).{5,}$'),
                    ],
                ],
                name: [this.formdata.full_name, Validators.required],
                email: [
                    this.formdata.email,
                    [Validators.required, Validators.email],
                ],

                userrole: [this.formdata.role, Validators.required],
                isactive: [this.formdata.is_active],
            });
        }

        this.getRole();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;
        let id = this.formdata.id;
        let userName = this.signUpForm.value.username;
        let fullName = this.signUpForm.value.name;
        let isActive = this.signUpForm.value.isactive;
        let email = this.signUpForm.value.email;
        let password = this.signUpForm.value.password;
        let confirmPassword = this.signUpForm.value.confirmpassword;
        let user_role = this.signUpForm.value.userrole;
        console.log('signup', this.signUpForm);
        if (this.action === 'Add') {
            // Sign up
            this.accountService
                .registerGeneralUser(
                    '',
                    userName,
                    fullName,
                    isActive,
                    email,
                    password,
                    confirmPassword,
                    user_role
                )
                .subscribe({
                    next: (response: any) => {
                        // Navigate to the confirmation required page
                        if (response.status === 'Sucess') {
                            // Set the alert
                            this.alert = {
                                type: 'success',
                                message: response.message,
                            };

                            this.dialogRef.close(response);
                        } else {
                            this.alert = {
                                type: 'error',
                                message: response.message,
                            };

                            // Show the alert
                            this.showAlert = true;
                            this.signUpForm.enable();
                            this.signUpNgForm.resetForm();

                            // Reset the form
                        }
                    },
                    error: (response) => {
                        console.log('error', response);
                        // Re-enable the form
                        this.signUpForm.enable();

                        // Reset the form

                        // Set the alert
                        this.alert = {
                            type: 'error',
                            message: response.message,
                        };

                        // Show the alert
                        this.showAlert = true;
                    },
                });
        }
        if (this.action == 'Edit') {
            this.accountService
                .updateGeneralUser(
                    id,
                    userName,
                    fullName,
                    isActive,
                    email,
                    password,
                    confirmPassword,
                    user_role
                )
                .subscribe({
                    next: (response) => {
                        this.alert = {
                            type: 'success',
                            message: response.message,
                        };

                        this.dialogRef.close(response);
                    },
                    error: (error) => {
                        this.alert = {
                            type: 'error',
                            message: error.message,
                        };

                        // Show the alert
                        this.showAlert = true;
                        this.signUpForm.enable();
                    },
                });
        }
    }
    getRole() {
        this.accountService.getAllRoles().subscribe(
            {
                next: (response: ResponseOfListOfSelectListModel) => {
                    if (response.status === 'Sucess') {
                        this.roleList = response.data;
                        console.log('rolelist', this.roleList);
                    } else {
                        this.roleList = [];
                    }
                },
                error: (error) => {
                    console.log('error', error);
                },
            }

            // (response: ResponseOfListOfSelectListModel) => {
            //     if (response.status === 'Sucess') {
            //         this.roleList = response.data;
            //         console.log('rolelist', this.roleList);
            //     } else {
            //         this.roleList = [];
            //     }
            // },
            // (error) => {
            //     console.log('error', error);
            // }
        );
    }
    closeDialog(): void {
        this.dialogRef.close();
    }
}
/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('confirmpassword');
    console.log('password', password);
    console.log('passwordConfirm', passwordConfirm);

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
