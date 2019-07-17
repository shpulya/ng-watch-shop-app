import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { MainPageComponent } from './core/components/main-page/main-page.component';
import { SearchedItemsComponent } from './core/components/searched-items/searched-items.component';
import { CheckoutComponent } from './core/components/checkout/checkout.component';
import { ThanksPageComponent } from './core/components/checkout/thanks-page/thanks-page.component';
import { watchesRoutes } from './features/watches/watches.routes';
import { wristbandsRouts } from './features/wristbands/wristbands.routes';

const generalRoutes: Routes = [
    {
        path: 'searched',
        component: SearchedItemsComponent,
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    { path: '',
        component: MainPageComponent,
    },
    { path: 'thanks-page',
        component: ThanksPageComponent,
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

const routes: Routes = [...watchesRoutes, ...wristbandsRouts, ...generalRoutes];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
