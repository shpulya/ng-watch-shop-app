import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

    @Input()
    public message: string = '';

    @Input()
    public showTooltip$!: Subject<boolean>;

    public showTooltip: boolean = false;

    public ngOnInit(): void {
        this.showTooltip$.subscribe(() => {
            this.showTooltip = true;

            setTimeout(() => {
                this.showTooltip = false;
            }, 300);
        });
    }
}
