import {Pipe, PipeTransform} from '@angular/core';
import {IGroupWatch, IWatch} from '../app.models';

@Pipe({
    name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

    public transform(watches: Array<IWatch>): Array<IGroupWatch> {
        if (!watches) {
            return [];
        }

        let groupWatches = Object.values(watches.reduce((acc: any, watch: IWatch) => {
            acc[watch.id] = acc[watch.id] || [watch.id, 0];
            acc[watch.id][1]++;
            return acc;
        }, {})).map((w: any) => ({
            'count': w[1],
            'item': watches.filter((watch: IWatch) =>
                watch.id === w[0])[0]
        }));

        return groupWatches;
    }

}
