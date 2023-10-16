import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/landing/home/home.module').then(
                        (m) => m.LandingHomeModule
                    ),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('app/modules/admin/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'organization',
                loadChildren: () =>
                    import(
                        'app/modules/admin/organiztion/organization.module'
                    ).then((m) => m.OrganizationModule),
            },
            {
                path: 'tasks',
                loadChildren: () =>
                    import('app/modules/admin/tasks/tasks.module').then(
                        (m) => m.TasksModule
                    ),
            },
            {
                path: 'createuser',
                loadChildren: () =>
                    import(
                        'app/modules/admin/create-user/create-user.module'
                    ).then((m) => m.CreateUserModule),
            },
            {
                path: 'rolepolicy',
                loadChildren: () =>
                    import(
                        'app/modules/admin/role-policy/role-policy.module'
                    ).then((m) => m.RolePolicyModule),
            },
            {
                path: 'AdministrativeDivisions',
                loadChildren: () =>
                    import(
                        'app/modules/admin/administrative-divisions/administrative-divisons.module'
                    ).then((m) => m.AdministrativeDivisonsModule),
            },
            {
                path: 'fiscalyearaccess',
                loadChildren: () =>
                    import(
                        'app/modules/admin/fiscalyear-access/fiscalyear-access.module'
                    ).then((m) => m.FiscalyearAccessModule),
            },
            {
                path: 'qachecklist',
                loadChildren: () =>
                    import(
                        'app/modules/ARH_CheckLists/Quality Assurance CheckList/qa-checklist/qa-checklist.module'
                    ).then((m) => m.QaChecklistModule),
            },
            {
                path: 'healthfacilities',
                loadChildren: () =>
                    import(
                        'app/modules/ARH_CheckLists/health-facilities/health-facilities.module'
                    ).then((m) => m.HealthFacilitiesModule),
            },
        ],
    },
    {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
];
