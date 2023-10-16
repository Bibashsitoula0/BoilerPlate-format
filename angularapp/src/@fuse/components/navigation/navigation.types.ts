import {
    IsActiveMatchOptions,
    Params,
    QueryParamsHandling,
} from '@angular/router';

export interface FuseNavigationItem {
    id?: string;
    navigation_id?: number;
    parent_navigation_id?: number;
    root_navigation_id?: number;
    display_order?: number;
    showin_ui?: boolean;
    can_create?: boolean;
    can_review?: boolean;
    can_approve?: boolean;
    can_allow?: boolean;
    can_delete?: boolean;
    can_full_access?: boolean;
    title?: string;
    subtitle?: string;
    type: 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer';
    hidden?: (item: FuseNavigationItem) => boolean;
    active?: boolean;
    disabled?: boolean;
    tooltip?: string;
    link?: string;
    fragment?: string;
    preserveFragment?: boolean;
    queryParams?: Params | null;
    queryParamsHandling?: QueryParamsHandling | null;
    externalLink?: boolean;
    target?: '_blank' | '_self' | '_parent' | '_top' | string;
    exactMatch?: boolean;
    isActiveMatchOptions?: IsActiveMatchOptions;
    function?: (item: FuseNavigationItem) => void;
    classes?: {
        title?: string;
        subtitle?: string;
        icon?: string;
        wrapper?: string;
    };
    icon?: string;
    badge?: {
        title?: string;
        classes?: string;
    };
    children?: FuseNavigationItem[];
    meta?: any;
}

export type FuseVerticalNavigationAppearance =
    | 'default'
    | 'compact'
    | 'dense'
    | 'thin';

export type FuseVerticalNavigationMode = 'over' | 'side';

export type FuseVerticalNavigationPosition = 'left' | 'right';
