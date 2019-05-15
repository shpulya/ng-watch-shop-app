export interface IItem extends IItemDetail {
    id: number;
    image: string;
    name: string;
    price: number;
}

export interface IItemDetail {
    description: string;
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
    name: keyof IItemDetail;
    displayName: string;
    showFilter: boolean;
}
