import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IWristband } from '../../../../app.models';
import { CookiesService } from '../../../../core/services/cookies.service';

@Component({
    selector: 'app-wristband-detail',
    templateUrl: './wristband-detail.component.html'
})
export class WristbandDetailComponent implements OnInit, OnDestroy {

    public wristband!: IWristband | null;

    public queryParams!: Params;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private cookiesService: CookiesService
    ) {}

    public ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.wristband = data.item;
            this.cookiesService.setCookie('viewedItems', `wristband#${data.item.id}`, 1);

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
