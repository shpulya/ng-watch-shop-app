import { Input, Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { IWristband } from '../../../../app.models';

@Injectable()
export abstract class WristbandsViewController {

    @Input()
    public readonly wristband!: IWristband;

    @Input()
    public queryURLParams!: Params;
}
