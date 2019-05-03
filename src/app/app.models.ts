export interface IWatch {
    id: number;

    image: string;

    name: string;

    description: string;

    manufacturer: string;

    screenSize: number;

    screenType: string;

    os: string;

    ramSize: string;

    romSize: string;

    price: number;
}

export interface IPrice {
    from: number;

    to: number;
}

export interface IFilter {
    name: keyof IWatch;
    displayName: string;
    showFilter: boolean;
}
