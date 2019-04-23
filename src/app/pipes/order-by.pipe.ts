import { Pipe, PipeTransform } from '@angular/core';
import {IWatch} from '../app.models';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  public transform(watches: Array<IWatch>, orderBy: string): any {
    if (!watches) { return []; }


  }

}
