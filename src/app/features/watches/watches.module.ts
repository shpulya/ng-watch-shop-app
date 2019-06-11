import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { SearchedWatchesComponent } from './components/searched-watches/searched-watches.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { WatchesComponent } from './components/watches/watches.component';
import { WatchDetailComponent } from './components/watch-detail/watch-detail.component';
import { WatchesGridViewComponent } from './components/watches/watches-grid-view/watches-grid-view.component';
import { WatchesListViewComponent } from './components/watches/watches-list-view/watches-list-view.component';

@NgModule({
    declarations: [
        SearchedWatchesComponent,
        SidenavComponent,
        WatchesComponent,
        WatchDetailComponent,
        WatchesGridViewComponent,
        WatchesListViewComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
})
export class WatchesModule {}
