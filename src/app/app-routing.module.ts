import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchesComponent } from './features/watches/components/watches/watches.component';
import { WatchDetailComponent } from './features/watches/components/watch-detail/watch-detail.component';
import { WatchesResolver } from './features/watches/resolvers/watches.resolver';
import { WatchDetailsResolver } from './features/watches/resolvers/watch-details.resolver';
import { SearchedWatchesComponent } from './features/watches/components/searched-watches/searched-watches.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { WristbandsComponent } from './features/wristbands/components/wristbands/wristbands.component';
import { WristbandsResolver } from './features/wristbands/resolvers/wristbands.resolver';
import { WristbandDetailComponent } from './features/wristbands/components/wristband-detail/wristband-detail.component';
import { WristbandDetailsResolver } from './features/wristbands/resolvers/wristband-details.resolver';
import { MainPageComponent } from './core/components/main-page/main-page.component';

const routes: Routes = [
    {
        path: 'watches',
        component: WatchesComponent,
        resolve: {
            watches: WatchesResolver
        }
    },
    {
        path: 'watch/:watchId',
        component: WatchDetailComponent,
        resolve: {
            watch: WatchDetailsResolver
        }
    },
    {
        path: 'wristbands',
        component: WristbandsComponent,
        resolve: {
            wristbands: WristbandsResolver
        }
    },
    {
        path: 'wristband/:wristbandId',
        component: WristbandDetailComponent,
        resolve: {
            wristband: WristbandDetailsResolver
        }
    },
    {
        path: 'searched',
        component: SearchedWatchesComponent,
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
