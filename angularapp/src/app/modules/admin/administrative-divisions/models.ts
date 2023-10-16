// src/app/models.ts

export interface Province {
    name: string;
    districts?: District[];
    isLoading?: boolean;
}

export interface District {
    name: string;
    palikas?: Palika[];
    isLoading?: boolean;
}

export interface Palika {
    name: string;
}
