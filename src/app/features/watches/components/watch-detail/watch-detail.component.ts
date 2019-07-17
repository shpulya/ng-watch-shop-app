import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CookiesService } from '../../../../core/services/cookies.service';
import { IWatch } from '../../watches.models';

@Component({
    selector: 'app-watch-detail',
    templateUrl: './watch-detail.component.html'
})
export class WatchDetailComponent implements OnInit, OnDestroy {

    public watch!: IWatch | null;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private cookiesService: CookiesService
    ) {}

    public ngOnInit(): void {
        this.route.data
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.watch = data.item;
                this.cookiesService.setViewedItemToCookie('watch', data.item.id);
            })
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
