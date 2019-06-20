import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WristbandDetailComponent } from './components/wristband-detail/wristband-detail.component';
import { WristbandsGridViewComponent } from './components/wristbands/wristbands-grid-view/wristbands-grid-view.component';
import { WristbandsListViewComponent } from './components/wristbands/wristbands-list-view/wristbands-list-view.component';
import { WristbandsComponent } from './components/wristbands/wristbands.component';
import { SharedModule } from '../../shared/shared.module';
import { WristbandsService } from './services/wristbands.service';
import { ITEMS_SERVICES } from '../../core/services/items-factory.service';
import { ITEMS_VIEW_COMPONENTS } from '../../core/services/items-view.service';

@NgModule({
    declarations: [
        WristbandDetailComponent,
        WristbandsGridViewComponent,
        WristbandsListViewComponent,
        WristbandsComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        WristbandsListViewComponent,
        WristbandsGridViewComponent
    ],
    entryComponents: [
        WristbandsGridViewComponent,
        WristbandsListViewComponent
    ],
    providers: [
        WristbandsService,
        {
            provide: ITEMS_SERVICES,
            useFactory: (wristbandsService: WristbandsService) => wristbandsService,
            deps: [WristbandsService],
            multi: true
        },
        {
            provide: ITEMS_VIEW_COMPONENTS,
            useValue: WristbandsListViewComponent,
            multi: true
        },
        {
            provide: ITEMS_VIEW_COMPONENTS,
            useValue: WristbandsGridViewComponent,
            multi: true
        }
    ]
})
export class WristbandsModule {}
