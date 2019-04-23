import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WatchesListComponent} from './components/watches-list/watches-list.component';

const routes: Routes = [
    {
        path: '',
        component: WatchesListComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
