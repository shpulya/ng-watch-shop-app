import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchesComponent } from './components/watches/watches.component';
import { WatchDetailComponent } from './components/watch-detail/watch-detail.component';
import { WatchesResolver } from './services/watches-resolver.service';
import { WatchDetailsResolverService } from './services/watch-details-resolver.service';
import { SearchedItemsComponent } from './components/searched-items/searched-items.component';

const routes: Routes = [
    {
        path: '',
        component: WatchesComponent,
        resolve: {
            watches: WatchesResolver
        }
    },
    {
        path: 'item/:itemId',
        component: WatchDetailComponent,
        resolve: {
            watch: WatchDetailsResolverService
        }
    },
    {
        path: 'searched/:searchedText',
        component: SearchedItemsComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
