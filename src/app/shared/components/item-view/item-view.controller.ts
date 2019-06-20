import { Injectable, Input } from '@angular/core';

import { IItem, ItemView } from '../../../app.models';
import { Params } from '@angular/router';

@Injectable()
export abstract class ItemViewController<ItemT extends IItem> {

    @Input()
    public item!: ItemT;

    @Input()
    public queryURLParams!: Params;

    @Input()
    public view!: ItemView;
}
