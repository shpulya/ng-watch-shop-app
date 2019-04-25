import {Component, OnInit, Output} from '@angular/core';
import {WatchesService} from '../../services/watches.service';
import {IWatch} from '../../app.models';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    public filtersMapKeys: any;

    private FILTERS: Array<string> = ['manufacturer', 'screenSize', 'screenType', 'os', 'ramSize', 'romSize'];

    private priceSet: Set<any> = new Set([{'from': 0}, {'to': 999999}]);

    public filtersMap: Map<string, Set<any>> = new Map(Object.entries({'price': this.priceSet}));

    public checkedFiltersMap: Map<string, Set<any>> = new Map(Object.entries({'price': this.priceSet}));


    constructor(private watchesService: WatchesService) {
    }

    public ngOnInit(): void {
        this.watchesService.watches$.subscribe((watches: Array<IWatch>) => {
            this.getFiltersMap(watches);
        });

    }

    private getFiltersMap(watches: Array<any>): void {

        for (const filter of this.FILTERS) {

            const setPropsByFilter = new Set();

            for (const watch of watches) {

                if (watch.hasOwnProperty(filter)) {
                    setPropsByFilter.add(watch[filter]);
                }
            }
            this.filtersMap.set(filter, setPropsByFilter);
        }

        this.filtersMapKeys = Array.from(this.filtersMap.keys());
    }

    public changeFilterToMap(mapKey: string, setValue: any): void {

        if (this.checkedFiltersMap.has(mapKey) == false) {
            const filtersSet: any = new Set();

            filtersSet.add(setValue);
            this.checkedFiltersMap.set(mapKey, filtersSet);
            console.log(this.checkedFiltersMap);

            return;
        }



        if (this.checkedFiltersMap.has(mapKey) && !this.checkedFiltersMap.get(mapKey)!.has(setValue)) {
            this.checkedFiltersMap.get(mapKey)!.add(setValue);
            console.log(this.checkedFiltersMap);
            return;
        }


        if (this.checkedFiltersMap.has(mapKey) && this.checkedFiltersMap.get(mapKey)!.has(setValue)) {

            if (this.checkedFiltersMap.get(mapKey)!.size === 0) {
                console.log(this.checkedFiltersMap.get(mapKey)!.size);
                this.checkedFiltersMap.delete(mapKey);
            } else {
                this.checkedFiltersMap.get(mapKey)!.delete(setValue);
            }
            console.log(this.checkedFiltersMap);

            return;
        }

    }
}
