import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CookiesService } from '../../../../core/services/cookies.service';
import { IWristband } from '../../wristbands.models';

@Component({
    selector: 'app-wristband-detail',
    templateUrl: './wristband-detail.component.html'
})
export class WristbandDetailComponent implements OnInit, OnDestroy {

    public wristband!: IWristband | null;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private cookiesService: CookiesService
    ) {}

    public ngOnInit(): void {
        this.route.data
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.wristband = data.item;
                this.cookiesService.setViewedItemToCookie('wristband', data.item.id);
            })
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
