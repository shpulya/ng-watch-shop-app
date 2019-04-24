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

export interface IGroupWatch {
    count: number;

    item: IWatch;
}
