export interface IItem {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
}

export interface IWatch extends IItem {
    manufacturer: string;
    screenSize: number;
    screenType: string;
    os: string;
    ramSize: string;
    romSize: string;
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
