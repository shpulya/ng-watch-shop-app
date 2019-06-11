import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { WristbandsService } from '../../services/wristbands.service';
import { IWristband } from '../../../../app.models';
import { CartService } from '../../../../core/services/cart.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-wristband-detail',
    templateUrl: './wristband-detail.component.html',
    styleUrls: ['./wristband-detail.component.scss']
})
export class WristbandDetailComponent implements OnInit, OnDestroy {

    public wristband!: IWristband | null;

    public queryParams!: Params;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private wristbandsService: WristbandsService,
        private cartService: CartService
    ) {}

    public ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.wristband = data.wristband;

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

    public addWristbandToCart(wristband: IWristband): void {
        this.cartService.addItem(wristband);
    }
}
