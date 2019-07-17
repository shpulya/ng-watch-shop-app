import { Component } from '@angular/core';

import { IWristband } from '../../wristbands.models';
import { IFilter } from '../../../../shared/components/sidenav/sidenav.models';
import { ItemsController } from '../../../../shared/controllers/items.controller';

@Component({
    selector: 'app-watches',
    templateUrl: './wristbands.component.html',
    styleUrls: ['./wristbands.component.scss']
})
export class WristbandsComponent extends ItemsController<IWristband> {

    public header: string = 'Wristbands';

    public config: Array<IFilter> = [
        {
            name: 'fitFor',
            displayName: 'Fit For',
            showFilter: false
        }, {
            name: 'material',
            displayName: 'Material',
            showFilter: false
        }, {
            name: 'width',
            displayName: 'Width',
            showFilter: false
        }, {
            name: 'length',
            displayName: 'Length',
            showFilter: false
        }, {
            name: 'color',
            displayName: 'Color',
            showFilter: false
        }];
}
