import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoaderService } from '../../services/loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

    public hideLoading: boolean = false;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private loaderService: LoaderService
    ) {}

    public ngOnInit(): void {
        this.loaderService.loading$
            .pipe(takeUntil(this.destroy$))
            .subscribe((loading: boolean) => {
                this.hideLoading = !loading;
            })
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
