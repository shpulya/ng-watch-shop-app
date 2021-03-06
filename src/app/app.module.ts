import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PriceTagComponent } from './components/price-tag/price-tag.component';
import { WatchesComponent } from './components/watches/watches.component';
import { WatchesGridViewComponent } from './components/watches/watches-grid-view/watches-grid-view.component';
import { WatchesListViewComponent } from './components/watches/watches-list-view/watches-list-view.component';
import { HttpClientModule } from '@angular/common/http';
import { WatchDetailComponent } from './components/watch-detail/watch-detail.component';
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
        WatchesComponent,
        WatchesGridViewComponent,
        WatchesListViewComponent,
        WatchDetailComponent,
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
