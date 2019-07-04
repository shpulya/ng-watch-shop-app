import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchesComponent } from './features/watches/components/watches/watches.component';
import { WatchDetailComponent } from './features/watches/components/watch-detail/watch-detail.component';
import { WatchesResolver } from './features/watches/resolvers/watches.resolver';
import { WatchDetailsResolver } from './features/watches/resolvers/watch-details.resolver';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { WristbandsComponent } from './features/wristbands/components/wristbands/wristbands.component';
import { WristbandsResolver } from './features/wristbands/resolvers/wristbands.resolver';
import { WristbandDetailComponent } from './features/wristbands/components/wristband-detail/wristband-detail.component';
import { WristbandDetailsResolver } from './features/wristbands/resolvers/wristband-details.resolver';
import { MainPageComponent } from './core/components/main-page/main-page.component';
import { SearchedItemsComponent } from './core/components/searched-items/searched-items.component';
import { CheckoutComponent } from './core/components/checkout/checkout.component';

const routes: Routes = [
    {
        path: 'watches',
        component: WatchesComponent,
        resolve: {
            items: WatchesResolver
        }
    },
    {
        path: 'watch/:itemId',
        component: WatchDetailComponent,
        resolve: {
            item: WatchDetailsResolver
        }
    },
    {
        path: 'wristbands',
        component: WristbandsComponent,
        resolve: {
            items: WristbandsResolver
        }
    },
    {
        path: 'wristband/:itemId',
        component: WristbandDetailComponent,
        resolve: {
            item: WristbandDetailsResolver
        }
    },
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
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
