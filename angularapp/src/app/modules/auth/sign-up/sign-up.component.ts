import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AccountService } from 'app/Service/api.client.generated';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private accountService: AccountService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            username: [
                '',
                [
                    Validators.required,
                    Validators.pattern('^(?=.*?[a-z]).{5,}$'),
                ],
            ],
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmpassword: [
                '',
                [Validators.required, confirmPasswordValidator],
            ],
            isactive: [false],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    // signUp(): void {
    //     // Do nothing if the form is invalid
    //     if (this.signUpForm.invalid) {
    //         return;
    //     }

    //     // Disable the form
    //     this.signUpForm.disable();

    //     // Hide the alert
    //     this.showAlert = false;
    //     let userName = this.signUpForm.value.username;
    //     let fullName = this.signUpForm.value.name;
    //     let isActive = this.signUpForm.value.isactive;
    //     let email = this.signUpForm.value.email;
    //     let password = this.signUpForm.value.password;
    //     let confirmPassword = this.signUpForm.value.confirmpassword;
    //     console.log('signup', this.signUpForm);

    //     // Sign up
    //     this.accountService
    //         .registerGeneralUser(
    //             userName,
    //             fullName,
    //             isActive,
    //             email,
    //             password,
    //             confirmPassword
    //         )
    //         .subscribe(
    //             (response) => {
    //                 // Navigate to the confirmation required page
    //                 if (response.status === 'Sucess') {
    //                     // Set the alert
    //                     this.alert = {
    //                         type: 'success',
    //                         message: response.message,
    //                     };

    //                     // Show the alert
    //                     this.showAlert = true;
    //                     this.signUpForm.enable();

    //                     // Reset the form
    //                     this.signUpNgForm.resetForm();
    //                 } else {
    //                     this.alert = {
    //                         type: 'error',
    //                         message: response.message,
    //                     };

    //                     // Show the alert
    //                     this.showAlert = true;
    //                     this.signUpForm.enable();

    //                     // Reset the form
    //                     this.signUpNgForm.resetForm();
    //                 }
    //             },
    //             (response) => {
    //                 console.log('error', response);
    //                 // Re-enable the form
    //                 this.signUpForm.enable();

    //                 // Reset the form
    //                 this.signUpNgForm.resetForm();

    //                 // Set the alert
    //                 this.alert = {
    //                     type: 'error',
    //                     message: response.message,
    //                 };

    //                 // Show the alert
    //                 this.showAlert = true;
    //             }
    //         );
    // }
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
