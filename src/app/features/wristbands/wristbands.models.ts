import { IItem } from '../../app.models';

export interface IWristbandDetails {
    fitFor: string;
    material: number;
    width: string;
    length: string;
    color: string;
}

export interface IWristband extends IItem, IWristbandDetails {}
