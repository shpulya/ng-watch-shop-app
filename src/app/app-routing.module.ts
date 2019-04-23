import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WatchesListComponent} from './components/watches-list/watches-list.component';
import {WatchDetailComponent} from './components/watch-detail/watch-detail.component';

const routes: Routes = [
    {
        path: '',
        component: WatchesListComponent
    },
    {
        path: 'watch/:watchId',
        component: WatchDetailComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
