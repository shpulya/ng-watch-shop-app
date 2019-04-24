import { Pipe, PipeTransform } from '@angular/core';
import {IWatch} from '../app.models';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  public transform(watches: Array<IWatch>, currentPage: number, countWatchesOnPage: number): any {
    if (!watches) return [];

    return watches.filter((watch: IWatch, i: number) =>
        (i > (currentPage - 1) * countWatchesOnPage - 1 && i <= currentPage * countWatchesOnPage - 1 ));
  }

}
