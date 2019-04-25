import { Component, OnInit } from '@angular/core';
import {WatchesService} from '../../services/watches.service';
import {IWatch} from '../../app.models';

@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrls: ['./watches.component.scss']
})
export class WatchesComponent implements OnInit {

  public viewMode: string = 'grid';

  public watches!: Array<IWatch>;

  public orderBy: string = 'asc';

  public countOnPage: number = 8;

  public currentPage: number = 1;

  constructor(private watchesService: WatchesService) {
  }

  public ngOnInit(): void {
      this.getWatches();
  }

  public getWatches(): void {
      this.watchesService.getWatches().subscribe((watches: Array<IWatch>) => {
          this.watches = watches;
      });
  }

  public changeViewMode(): void {
      if (this.viewMode === 'grid') {
          this.viewMode = 'list';
      } else {
          this.viewMode = 'grid';
      }
  }

  public receiveCurrentPage($event: any): void {
      this.currentPage = $event;
  }
}
