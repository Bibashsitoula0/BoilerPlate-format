import { ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { AccountService, UserListDto } from 'app/Service/api.client.generated';
import { pagination } from 'app/modules/pagination';
import { CreateuserDialogComponent } from './createuser-dialog/createuser-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ChangeuserpasswordComponent } from '../changeuserpassword/changeuserpassword.component';
import { MatSnackService } from 'app/Service/mat-snack.service';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 56% 15% 20% 15% 10% 10%;

                @screen sm {
                    grid-template-columns: 56% 20% 25% 15% 10% 15%;
                }

                @screen md {
                    grid-template-columns: 15% 20% 25% 15% 10% 15%;
                }

                @screen lg {
                    grid-template-columns: 15% 20% 25% 15% 10% 15%;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,

    animations: fuseAnimations,
})
export class CreateUserComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true })
    searchString: string = '';
    paginator: MatPaginator;
    page = pagination.page;
    size = pagination.size;
    userlist$: UserListDto[];
    pageLength: number;
    errormsg: any;
    errorstatus: boolean = false;
    isLoading: boolean = false;
    title: string;
    form: any = <any>{};
    status: boolean = false;
    message: any;
    constructor(
        private accountservice: AccountService,
        private dialog: MatDialog,
        private matSnackbar: MatSnackService
    ) {}
    ngOnInit(): void {
        this.getGeneralUserList();
    }
    getGeneralUserList() {
        this.accountservice
            .userList(this.page, this.size, this.searchString)
            .subscribe({
                next: (response) => {
                    this.userlist$ = response.data;
                    console.log('userlist', this.userlist$);

                    if (this.userlist$.length === 0) {
                        this.pageLength = 0;
                    } else {
                        this.pageLength = this.userlist$[0].totalCount;
                    }
                },
                error: (error) => {
                    this.errormsg = error;
                    this.errorstatus = true;
                },
            });
    }

    createuser(action: any) {
        this.title = 'Add User';
        (this.form = {}), this.openUserDialog(action);
    }
    onEdit(row) {
        this.status = true;
        this.title = 'Edit User Details';
        this.form = row;
        this.openUserDialog('Edit');
    }
    openUserDialog(action: any) {
        const dialogRef = this.dialog.open(CreateuserDialogComponent, {
            width: '600px',
            data: {
                title: this.title,
                form: this.form,
                action: action,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log('response', result);
            if (result) {
                if (result.status === 'Sucess') {
                    this.matSnackbar.matSnackBarSuccess(result.message);
                } else {
                    this.matSnackbar.matSnackBarFail(result.message);
                }
            }
            this.getGeneralUserList();
        });
    }
    changeuserpasswordForm: any;
    onChangeUserPassword(row) {
        console.log('row', row);
        this.changeuserpasswordForm = row;
        this.openChangeUserPassword();
    }
    openChangeUserPassword() {
        const dialogRef = this.dialog.open(ChangeuserpasswordComponent, {
            data: {
                userData: this.changeuserpasswordForm,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result) {
                if (result.status === 'Sucess') {
                    this.matSnackbar.matSnackBarSuccess(result.message);
                } else {
                    this.matSnackbar.matSnackBarFail(result.message);
                }
            }
        });
    }

    searchPosts(searchText: any) {
        this.searchString = searchText;

        this.getGeneralUserList();
    }
    getServerData(event?: PageEvent) {
        console.log('event', event);
        this.page = event.pageIndex;
        this.size = event.pageSize;

        this.getGeneralUserList();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
