import { Component } from '@angular/core';

import { WristbandsViewController } from '../wristbands-view.controller';

@Component({
    selector: 'app-wristbands-grid-view',
    templateUrl: './wristbands-grid-view.component.html'
})
export class WristbandsGridViewComponent extends WristbandsViewController {}
