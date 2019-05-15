import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PriceTagComponent } from './components/price-tag/price-tag.component';
import { ItemsComponent } from './components/watches/items.component';
import { ItemsGridViewComponent } from './components/watches/items-grid-view/items-grid-view.component';
import { ItemsListViewComponent } from './components/watches/items-list-view/items-list-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PriceTagComponent,
        ItemsComponent,
        ItemsGridViewComponent,
        ItemsListViewComponent,
        ItemDetailComponent,
        CartComponent,
        PaginationComponent,
        SidenavComponent,
        TooltipComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
