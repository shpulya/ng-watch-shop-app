import { Injectable, Input } from '@angular/core';

import { IItem } from '../../../app.models';
import { Params } from '@angular/router';

@Injectable()
export abstract class ItemViewController<ItemT extends IItem> {

    @Input()
    public item!: ItemT;

    @Input()
    public queryURLParams!: Params;
}
