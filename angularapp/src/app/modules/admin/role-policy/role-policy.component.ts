import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    AccountService,
    NavigationService,
} from 'app/Service/api.client.generated';
import { MatSnackService } from 'app/Service/mat-snack.service';

@Component({
    selector: 'app-role-policy',
    templateUrl: './role-policy.component.html',
    styleUrls: ['./role-policy.component.scss'],
})
export class RolePolicyComponent {
    rolePolicyForm: FormGroup;
    control: FormArray;
    showDiv = false;
    data = [];
    constructor(
        private fb: FormBuilder,
        private navigationService: NavigationService,
        private accountService: AccountService,
        private matSnackBar: MatSnackService
    ) {}
    ngOnInit() {
        this.rolePolicyForm = this.fb.group({
            //isForAllBranches: [false, Validators.required],
            rolePolicyList: this.fb.array([]),
        });
        // this.getRolePolicyList();
        this.userRoleList();
    }
    initiateForm(): FormGroup {
        return this.fb.group({
            role_id: ['', Validators.required],
            parent_navigation: ['', Validators.required],
            navigation: ['', Validators.required],
            allow: ['', Validators.required],
            create: ['', Validators.required],
            edit: ['', Validators.required],
            review: ['', Validators.required],
            approve: ['', Validators.required],
            delete: ['', Validators.required],
            full_access: ['', Validators.required],
        });
    }
    formSetup(data: any) {}

    // async getRolePolicyList() {
    //     this.formSetup(this.data);
    //     console.log("data", this.data);
    // }

    get getFormControls() {
        const control = this.rolePolicyForm.get('rolePolicyList') as FormArray;
        return control;
    }
    roleId: string;

    onRoleChange(event: any) {
        this.roleId = event.value;
        if (this.roleId) {
            this.navigationService
                .getNavigationByRoleId(this.roleId)
                .subscribe((response) => {
                    const res: any = response;
                    this.data = res.data;
                    console.log('data', this.data);
                    console.log('rolePolicyList', this.rolePolicyForm);

                    const control = this.rolePolicyForm.get(
                        'rolePolicyList'
                    ) as FormArray;
                    control.clear();
                    for (let i = 0; i < this.data.length; i++) {
                        control.push(
                            this.fb.group({
                                role_id: [this.roleId, Validators.required],
                                navigation_id: [
                                    this.data[i].navigation_id,
                                    Validators.required,
                                ],
                                parent_navigation: [
                                    this.data[i].parent_navigation,
                                    Validators.required,
                                ],
                                navigation: [
                                    this.data[i].navigation,
                                    Validators.required,
                                ],
                                allowed: [
                                    this.data[i].allowed,
                                    Validators.required,
                                ],
                                can_create: [
                                    this.data[i].can_create,
                                    Validators.required,
                                ],
                                can_edit: [
                                    this.data[i].can_edit,
                                    Validators.required,
                                ],
                                can_review: [
                                    this.data[i].can_review,
                                    Validators.required,
                                ],
                                can_approve: [
                                    this.data[i].can_approve,
                                    Validators.required,
                                ],
                                can_delete: [
                                    this.data[i].can_delete,
                                    Validators.required,
                                ],
                                can_full_access: [
                                    this.data[i].can_full_access,
                                    Validators.required,
                                ],
                                url: [this.data[i].url, Validators.required],
                                icon: [this.data[i].icon, Validators.required],
                                navigation_type: [
                                    this.data[i].navigation_type,
                                    Validators.required,
                                ],
                                parent_navigation_id: [
                                    this.data[i].parent_navigation_id,
                                    Validators.required,
                                ],
                                root_navigation_id: [
                                    this.data[i].root_navigation_id,
                                    Validators.required,
                                ],
                                display_order: [
                                    this.data[i].display_order,
                                    Validators.required,
                                ],
                                showin_ui: [
                                    this.data[i].showin_ui,
                                    Validators.required,
                                ],
                            })
                        );
                    }
                });
        }

        this.showDiv = true;
    }
    roles = [];
    userRoleList() {
        this.accountService.getAllRoles().subscribe((response) => {
            const res: any = response;
            this.roles = res.data;
            console.log('role', this.roles);
        });
    }

    saveClick() {
        this.navigationService
            .submitNavigationRole(this.rolePolicyForm.value.rolePolicyList)
            .subscribe(
                (response) => {
                    if (response.status === 'Sucess') {
                        window.location.reload();
                        this.matSnackBar.matSnackBarSuccess(response.message);
                    } else {
                        this.matSnackBar.matSnackBarFail(response.message);
                    }
                    // this.utilityService.callSnackBar(res.message, 'success');
                },
                (error) => {
                    this.matSnackBar.matSnackBarFail('Error while calling api');
                }
            );
    }
}
