/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    // {
    //     navigation_id: 1,
    //     title: 'Dashboard',
    //     link: '/dashboard',
    //     type: 'basic',
    //     parent_navigation_id: 0,
    //     root_navigation_id: 0,
    //     icon: 'heroicons_outline:chart-pie',
    //     display_order: 1,
    //     showin_ui: true,
    //     can_create: true,
    //     can_review: true,
    //     can_approve: true,
    //     can_allow: true,
    //     can_delete: true,
    //     can_full_access: true,
    //     children: [],
    // },
    // {
    //     navigation_id: 2,
    //     title: 'Settings',
    //     link: null,
    //     type: 'collapsable',
    //     parent_navigation_id: 0,
    //     root_navigation_id: 0,
    //     icon: 'feather:settings',
    //     display_order: 2,
    //     showin_ui: true,
    //     can_create: true,
    //     can_review: true,
    //     can_approve: true,
    //     can_allow: true,
    //     can_delete: true,
    //     can_full_access: true,
    //     children: [
    //         {
    //             id: 'userdetail',
    //             title: 'User Details',
    //             type: 'basic',
    //             icon: 'heroicons_outline:chart-pie',
    //             link: '/createuser',
    //         },
    //         {
    //             id: 'administrativedivision',
    //             title: 'Administrative Division',
    //             type: 'basic',
    //             icon: 'heroicons_outline:chart-pie',
    //             link: '/AdministrativeDivisions',
    //         },
    //         {
    //             id: 'fiscalyearlist',
    //             title: 'Fiscal Year List',
    //             type: 'basic',
    //             icon: 'heroicons_outline:chart-pie',
    //             link: '/fiscalyearaccess',
    //         },
    //         {
    //             id: 'rolepolicy',
    //             title: 'Role Policy',
    //             type: 'basic',
    //             icon: 'heroicons_outline:chart-pie',
    //             link: '/rolepolicy',
    //         },
    //     ],
    // },
];
export function updateDefaultNavigation(data) {
    console.log('navigation', data);
    defaultNavigation.length = 0; // Clear the existing data
    Array.prototype.push.apply(defaultNavigation, data);
}

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'aside',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
