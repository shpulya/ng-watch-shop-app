import { Component } from '@angular/core';

import { WristbandsViewController } from '../wristbands-view.controller';

@Component({
    selector: 'app-wristbands-list-view',
    templateUrl: './wristbands-list-view.component.html'
})
export class WristbandsListViewComponent extends WristbandsViewController {}
