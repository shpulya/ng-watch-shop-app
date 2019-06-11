import { NgModule } from '@angular/core';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ModeViewMenuComponent } from './components/mode-view-menu/mode-view-menu.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PriceTagComponent } from './components/price-tag/price-tag.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ItemsListComponent,
        ModeViewMenuComponent,
        PaginationComponent,
        PriceTagComponent,
        TooltipComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        ItemsListComponent,
        ModeViewMenuComponent,
        PaginationComponent,
        PriceTagComponent,
        TooltipComponent,
        RouterModule
    ]
})
export class SharedModule {}

