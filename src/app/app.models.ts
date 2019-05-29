export interface IItem {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
}

export interface IWatchDetails {
    manufacturer: string;
    screenSize: number;
    screenType: string;
    os: string;
    ramSize: string;
    romSize: string;
}

export interface IWatch extends IItem, IWatchDetails {}

export interface IPrice {
    from: number;
    to: number;
}

export interface IWatchFilter {
    name: keyof IWatchDetails;
    displayName: string;
    showFilter: boolean;
}

export interface ICart {
    item: IItem;
    count: number;
}
