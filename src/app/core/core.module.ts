import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SearchedItemsComponent } from './components/searched-items/searched-items.component';
import { WatchesModule } from '../features/watches/watches.module';
import { WristbandsModule } from '../features/wristbands/wristbands.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        CartComponent,
        HeaderComponent,
        LoadingComponent,
        PageNotFoundComponent,
        MainPageComponent,
        SearchedItemsComponent,
        CheckoutComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        WatchesModule,
        WristbandsModule,
        FormsModule
    ],
    exports: [
        CartComponent,
        HeaderComponent,
        LoadingComponent,
        PageNotFoundComponent
    ]
})
export class CoreModule {

    constructor(
        @Optional() @SkipSelf() parent: CoreModule
    ) {
        if (parent) {
            throw new Error('Core Module is imported to App');
        }
    }
}
