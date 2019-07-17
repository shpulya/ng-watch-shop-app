import { IItem } from '../../app.models';

export interface IWatchDetails {
    manufacturer: string;
    screenSize: number;
    screenType: string;
    os: string;
    ramSize: string;
    romSize: string;
}


export interface IWatch extends IItem, IWatchDetails {}
