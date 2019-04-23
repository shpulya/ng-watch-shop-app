import { Pipe, PipeTransform } from '@angular/core';
import {IWatch} from '../app.models';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  public transform(watches: Array<IWatch>, orderBy: string): any {
    if (!watches) { return []; }

    if (orderBy === 'asc') {
        return watches.sort((a: IWatch, b: IWatch) => a.price - b.price);
    } else {
        return watches.sort((a: IWatch, b: IWatch) => b.price - a.price);
    }
  }

}
