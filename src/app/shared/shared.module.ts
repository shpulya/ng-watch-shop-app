import { NgModule } from '@angular/core';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ModeViewMenuComponent } from './components/mode-view-menu/mode-view-menu.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PriceTagComponent } from './components/price-tag/price-tag.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemsGridViewComponent } from './components/items-grid-view/items-grid-view.component';
import { ItemsListViewComponent } from './components/items-list-view/items-list-view.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ItemViewComponent } from './components/item-view/item-view.component';
import { CarouselItemComponent } from './components/carousel/carousel-item/carousel-item.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
    declarations: [
        ItemsListComponent,
        ModeViewMenuComponent,
        PaginationComponent,
        PriceTagComponent,
        TooltipComponent,
        ItemDetailComponent,
        ItemsListViewComponent,
        ItemsGridViewComponent,
        SidenavComponent,
        ItemViewComponent,
        CarouselItemComponent,
        CarouselComponent
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
        RouterModule,
        ItemDetailComponent,
        ItemsGridViewComponent,
        SidenavComponent,
        ItemsListViewComponent,
        ItemViewComponent,
        CarouselItemComponent,
        CarouselComponent
    ]
})
export class SharedModule {}

