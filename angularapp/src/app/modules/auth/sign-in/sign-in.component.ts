import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AccountService } from 'app/Service/api.client.generated';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;
    status: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
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
        this.signInForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    loginstatus: boolean;
    signIn(): void {
        this.status = true;
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        let username = this.signInForm.value.username;
        let password = this.signInForm.value.password;
        this._authService.signIn(username, password).subscribe({
            next: (response: any) => {
                if (response.status === 'Sucess') {
                    window.location.reload();
                    const redirectURL =
                        this._activatedRoute.snapshot.queryParamMap.get(
                            'redirectURL'
                        ) || '/signed-in-redirect';
                    console.log('redirectURL', redirectURL);

                    this._router.navigateByUrl(redirectURL);
                } else {
                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: response.message,
                    };

                    // Show the alert
                    this.showAlert = true;
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();
                }
            },
            error: (error: any) => {
                console.log('error', error);
                const res: any = error;

                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: error.message,
                };

                // Show the alert
                this.showAlert = true;
            },
        });
    }
}
