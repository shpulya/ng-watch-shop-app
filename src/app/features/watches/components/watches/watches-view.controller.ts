import { Input, Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { IWatch } from '../../../../app.models';

@Injectable()
export abstract class WatchesViewController {

    @Input()
    public readonly watch!: IWatch;

    @Input()
    public queryURLParams!: Params;
}
