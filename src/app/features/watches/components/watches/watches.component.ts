import { Component } from '@angular/core';

import { IWatch } from '../../watches.models';
import { IFilter } from '../../../../shared/components/sidenav/sidenav.models';
import { ItemsController } from '../../../../shared/controllers/items.controller';

@Component({
    selector: 'app-watches',
    templateUrl: './watches.component.html',
    styleUrls: ['./watches.component.scss']
})
export class WatchesComponent extends ItemsController<IWatch> {

    public header: string = 'watches';

    public config: Array<IFilter> = [
        {
            name: 'manufacturer',
            displayName: 'Manufacturer',
            showFilter: false
        }, {
            name: 'screenSize',
            displayName: 'Screen Size',
            showFilter: false
        }, {
            name: 'screenType',
            displayName: 'Screen Type',
            showFilter: false
        }, {
            name: 'os',
            displayName: 'OS',
            showFilter: false
        }, {
            name: 'ramSize',
            displayName: 'RAM Size',
            showFilter: false
        }, {
            name: 'romSize',
            displayName: 'Internal Memory',
            showFilter: false
        }];
}
