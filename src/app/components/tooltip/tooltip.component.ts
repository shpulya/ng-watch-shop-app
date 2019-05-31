import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnDestroy {

    @Input()
    public message: string = '';

    @Input()
    public showTooltip$!: Subject<boolean>;

    public showTooltip: boolean = false;

    private destroy$: Subject<void> = new Subject();

    public ngOnInit(): void {
        this.showTooltip$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.showTooltip = true;

                setTimeout(() => {
                    this.showTooltip = false;
                }, 300);
            })
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
