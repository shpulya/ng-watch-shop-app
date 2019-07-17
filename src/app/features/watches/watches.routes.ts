import { Routes } from '@angular/router';

import { WatchesComponent } from './components/watches/watches.component';
import { WatchesResolver } from './resolvers/watches.resolver';
import { WatchDetailComponent } from './components/watch-detail/watch-detail.component';
import { WatchDetailsResolver } from './resolvers/watch-details.resolver';

export const watchesRoutes: Routes = [
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
    }
];
