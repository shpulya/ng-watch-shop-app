export enum ItemType {
    Watch = 'watch',
    Wristband = 'wristband'
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

export interface IType {
    type: string;
    pluralType: string;
}
