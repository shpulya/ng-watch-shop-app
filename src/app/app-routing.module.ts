import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './components/watches/items.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';

const routes: Routes = [
    {
        path: '',
        component: ItemsComponent
    },
    {
        path: 'item/:itemId',
        component: ItemDetailComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
