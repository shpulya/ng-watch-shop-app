import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PriceTagComponent } from './components/price-tag/price-tag.component';
import { WatchesComponent } from './components/watches/watches.component';
import { WatchesGridViewComponent } from './components/watches/watches-grid-view/watches-grid-view.component';
import { WatchesListViewComponent } from './components/watches/watches-list-view/watches-list-view.component';
import { CartComponent } from './components/cart/cart.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { WatchDetailComponent } from './components/watch-detail/watch-detail.component';
import { LoadingComponent } from './components/loading/loading.component';
import { WatchDetailsResolverService } from './services/watch-details-resolver.service';

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
        LoadingComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        CookieService,
        WatchDetailsResolverService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
