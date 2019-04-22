import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WatchesService} from './services/watches.service';
import {IWatch} from './app.models';
import { HeaderComponent } from './components/header/header.component';
import { PriceTagComponent } from './components/price-tag/price-tag.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PriceTagComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(
        private watchesService: WatchesService,
    ) {

        watchesService.getWatchById('some_id').subscribe((watch: IWatch) => {
            console.log(watch.id);
        });
    }
}
