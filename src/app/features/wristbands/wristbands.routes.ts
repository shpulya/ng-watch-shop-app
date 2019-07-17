import { Routes } from '@angular/router';

import { WristbandsComponent } from './components/wristbands/wristbands.component';
import { WristbandsResolver } from './resolvers/wristbands.resolver';
import { WristbandDetailComponent } from './components/wristband-detail/wristband-detail.component';
import { WristbandDetailsResolver } from './resolvers/wristband-details.resolver';

export const wristbandsRouts: Routes = [
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
];
