import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { WatchDetailComponent } from './components/watch-detail/watch-detail.component';
import { ItemsResolverService } from './services/items-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ItemsComponent,
        resolve: {
            watches: ItemsResolverService
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
