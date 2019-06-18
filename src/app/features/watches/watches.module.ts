import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { WatchesComponent } from './components/watches/watches.component';
import { WatchDetailComponent } from './components/watch-detail/watch-detail.component';
import { WatchesGridViewComponent } from './components/watches/watches-grid-view/watches-grid-view.component';
import { WatchesListViewComponent } from './components/watches/watches-list-view/watches-list-view.component';
import { WatchesService } from './services/watches.service';
import { ITEMS_SERVICES } from '../../core/services/items-factory.service';

@NgModule({
    declarations: [
        WatchesComponent,
        WatchDetailComponent,
        WatchesGridViewComponent,
        WatchesListViewComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        WatchesGridViewComponent,
        WatchesListViewComponent
    ],
    providers: [
        WatchesService,
        {
            provide: ITEMS_SERVICES,
            useFactory: (watchesService: WatchesService) => watchesService,
            deps: [WatchesService],
            multi: true
        }
    ]
})
export class WatchesModule {}
