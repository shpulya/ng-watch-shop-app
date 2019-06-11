import { NgModule } from '@angular/core';
import { SearchedWristbandsComponent } from './components/searched-wristbands/searched-wristbands.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { WristbandDetailComponent } from './components/wristband-detail/wristband-detail.component';
import { WristbandsGridViewComponent } from './components/wristbands/wristbands-grid-view/wristbands-grid-view.component';
import { WristbandsListViewComponent } from './components/wristbands/wristbands-list-view/wristbands-list-view.component';
import { WristbandsComponent } from './components/wristbands/wristbands.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        SearchedWristbandsComponent,
        SidenavComponent,
        WristbandDetailComponent,
        WristbandsGridViewComponent,
        WristbandsListViewComponent,
        WristbandsComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class WristbandsModule {}
