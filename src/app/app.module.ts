import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PriceTagComponent } from './components/price-tag/price-tag.component';
import { WatchesComponent } from './components/items/watches/watches.component';
import { WatchesGridViewComponent } from './components/items/watches/watches-grid-view/watches-grid-view.component';
import { WatchesListViewComponent } from './components/items/watches/watches-list-view/watches-list-view.component';
import { CartComponent } from './components/cart/cart.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { WatchDetailComponent } from './components/watch-detail/watch-detail.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchedItemsComponent } from './components/items/searched-items/searched-items.component';
import { ModeViewMenuComponent } from './components/mode-view-menu/mode-view-menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PriceTagComponent,
        WatchesComponent,
        WatchesGridViewComponent,
        WatchesListViewComponent,
        WatchDetailComponent,
        CartComponent,
        PaginationComponent,
        SidenavComponent,
        TooltipComponent,
        LoadingComponent,
        SearchedItemsComponent,
        ModeViewMenuComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
