import { Component, OnInit } from '@angular/core';
import { WatchesService } from '../../services/watches.service';
import { IWatch } from '../../app.models';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    public filtersMapKeys!: Array<keyof IWatch>;

    public filtersMap: Map<keyof IWatch, Set<keyof IWatch>> = new Map();

    public checkedFiltersMap: Map<keyof IWatch, Set<keyof IWatch>> = new Map();

    private filters: Array<keyof IWatch> = ['manufacturer', 'screenSize', 'screenType', 'os', 'ramSize', 'romSize'];

    private priceSet: Set<{}> = new Set([{from: 0}, {to: 999999}]);


    constructor(private watchesService: WatchesService) {
    }

    public ngOnInit(): void {
        this.watchesService.watches$.subscribe((watches: Array<IWatch>) => {
            this.getFiltersMap(watches);
        });

    }

    public onFiltersChecked(category: keyof IWatch, value: any): void {

        const currentCategory = this.checkedFiltersMap.get(category);

        if (!this.checkedFiltersMap.has(category)) {
            const filtersSet: Set<keyof IWatch> = new Set();

            filtersSet.add(value);
            this.checkedFiltersMap.set(category, filtersSet);
            console.log(this.checkedFiltersMap);
        }

        if (!currentCategory) {
            return;
        }

        if (currentCategory && currentCategory.has(value)) {
            currentCategory.delete(value);
        } else {
            currentCategory.add(value);
        }

        if (!currentCategory.size) {
            this.checkedFiltersMap.delete(category);
        }

        console.log(this.checkedFiltersMap);
    }


    private getFiltersMap(watches: Array<IWatch>): void {

        for (const filter of this.filters) {

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
}
