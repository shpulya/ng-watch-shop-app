import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IWristband } from '../../../../app.models';

@Component({
    selector: 'app-wristband-detail',
    templateUrl: './wristband-detail.component.html'
})
export class WristbandDetailComponent implements OnInit, OnDestroy {

    public wristband!: IWristband | null;

    public queryParams!: Params;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.wristband = data.item;

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
