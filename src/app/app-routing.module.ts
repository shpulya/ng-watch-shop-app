import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WatchesComponent} from './components/watches/watches.component';
import {WatchDetailComponent} from './components/watch-detail/watch-detail.component';

const routes: Routes = [
    {
        path: '',
        component: WatchesComponent
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
