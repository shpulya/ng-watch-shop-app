
export enum ItemType {
    Watch = 'watch',
    Wristband = 'wristband'
}

export enum ItemCategories {
    watch = 'watches',
    wristband = 'wristbands'
}

export enum ItemView {
    Grid = 'grid',
    List = 'list'
}

export interface IShortItemInfo {
    id: number;
    type: string;
}

export interface IItem extends IShortItemInfo {
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

export interface IWristbandDetails {
    fitFor: string;
    material: number;
    width: string;
    length: string;
    color: string;
}

export interface IWatch extends IItem, IWatchDetails {}

export interface IWristband extends IItem, IWristbandDetails {}

export interface IPrice {
    from: number;
    to: number;
}

export interface IFilter {
    name: string;
    displayName: string;
    showFilter: boolean;
}

export interface ICart {
    item: IItem;
    count: number;
}

export interface IType {
    type: string;
    pluralType: string;
}

export interface IContacts {
    city: string;
    region: string;
    name: string;
    email: string;
}

export interface IDelivery {
    delivery: string;
    payment: string;
    isSure: boolean;
}
