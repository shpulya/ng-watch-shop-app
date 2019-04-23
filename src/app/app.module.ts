import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PriceTagComponent } from './components/price-tag/price-tag.component';
import { WatchesListComponent } from './components/watches-list/watches-list.component';
import { WatchesGridViewComponent } from './components/watches-list/watches-grid-view/watches-grid-view.component';
import { WatchesListViewComponent } from './components/watches-list/watches-list-view/watches-list-view.component';
import {HttpClientModule} from '@angular/common/http';
import { OrderByPipe } from './pipes/order-by.pipe';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PriceTagComponent,
        WatchesListComponent,
        WatchesGridViewComponent,
        WatchesListViewComponent,
        OrderByPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
