import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { CreateuserDialogModule } from './modules/admin/create-user/createuser-dialog/createuser-dialog.module';

import { DataService } from './shared/data.service';
import { AccountService, CommonService } from './Service/api.client.generated';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackService } from './Service/mat-snack.service';
import { MatNativeDateModule } from '@angular/material/core';
import { HealthFacilitiesComponent } from './modules/ARH_CheckLists/health-facilities/health-facilities.component';

export function initializeApp(dataService: DataService) {
    return () => {
        return new Promise<void>((resolve) => {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                console.error(
                    'Access token is not available. Skipping initialization.'
                );
                resolve(); // Resolve the promise immediately if no access token is present.
                return;
            }

            dataService.fetchData().subscribe({
                next: (result) => {
                    dataService.setData(result);
                    resolve(); // Resolve the promise when data is fetched and set
                },
                error: (error) => {
                    console.error('Error fetching data:', error);
                    resolve(); // Resolve even in case of an error to allow the application to continue
                },
            });
        });
    };
}

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        CreateuserDialogModule,
        MatSnackBarModule,
        MatNativeDateModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [DataService],
            multi: true,
        },
        CommonService,
        AccountService,
        MatSnackService,
    ],
})
export class AppModule {}
