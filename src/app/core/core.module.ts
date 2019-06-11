import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
    declarations: [
        CartComponent,
        HeaderComponent,
        LoadingComponent,
        PageNotFoundComponent,
        MainPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule
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
