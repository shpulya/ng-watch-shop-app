export interface IItem {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
    type: string;
}

export interface IWatchDetails {
    manufacturer: string;
    screenSize: number;
    screenType: string;
    os: string;
    ramSize: string;
    romSize: string;
}

export interface IWristbandDetails {
    fitFor: string;
    material: number;
    width: string;
    length: string;
    color: string;
}

export interface IWatch extends IItem, IWatchDetails {}

export interface IWristband extends IItem, IWristbandDetails{}

export interface IPrice {
    from: number;
    to: number;
}

export interface IWatchFilter {
    name: keyof IWatchDetails;
    displayName: string;
    showFilter: boolean;
}

export interface IWristbandFilter {
    name: keyof IWristbandDetails;
    displayName: string;
    showFilter: boolean;
}

export interface ICart {
    item: IItem;
    count: number;
}
