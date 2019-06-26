import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IWatch } from '../../../../app.models';
import { CookiesService } from '../../../../core/services/cookies.service';
import { WatchesService } from '../../services/watches.service';

@Component({
    selector: 'app-watch-detail',
    templateUrl: './watch-detail.component.html'
})
export class WatchDetailComponent implements OnInit, OnDestroy {

    public watch!: IWatch | null;

    public queryParams!: Params;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private cookiesService: CookiesService
    ) {}

    public ngOnInit(): void {

        this.route.data.subscribe((data) => {
            this.watch = data.item;
            this.cookiesService.setViewedItemToCookie('watch', data.item.id);

            this.route.queryParams
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (queryParams: Params) => {
                        this.queryParams = queryParams;
                    },
                    () => {
                        alert(`Can't get query params!`);
                    }
                )
            ;
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
