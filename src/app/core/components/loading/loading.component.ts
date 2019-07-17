import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

    public loading: boolean = false;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private loaderService: LoaderService
    ) {}

    public ngOnInit(): void {
        this.loaderService.loading$
            .pipe(takeUntil(this.destroy$))
            .subscribe((loading: boolean) => {
                this.loading = !loading;
            })
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
