import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { WatchDetailComponent } from './components/watch-detail/watch-detail.component';
import { WatchesResolverService } from './services/watches-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ItemsComponent,
        resolve: {
            watches: WatchesResolverService
        }
    },
    {
        path: 'item/:itemId',
        component: WatchDetailComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
