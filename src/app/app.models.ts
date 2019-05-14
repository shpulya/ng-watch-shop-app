export interface IWatch extends IWatchDetail{
    id: number;
    image: string;
    name: string;
    price: number;
}

export interface IWatchDetail {
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
    name: keyof IWatchDetail;
    displayName: string;
    showFilter: boolean;
}

export interface ICartItem {
    id: string;
    count: number;
}
