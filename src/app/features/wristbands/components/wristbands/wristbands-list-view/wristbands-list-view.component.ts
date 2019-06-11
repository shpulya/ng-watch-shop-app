import { Component } from '@angular/core';

import { WristbandsViewController } from '../wristbands-view.controller';

@Component({
    selector: 'app-wristbands-list-view',
    templateUrl: './wristbands-list-view.component.html',
    styleUrls: ['./wristbands-list-view.component.scss']
})
export class WristbandsListViewComponent extends WristbandsViewController {}
