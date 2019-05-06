import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnChanges {

    @Input()
    public message: string = '';

    @Input()
    public isClicked!: boolean;


    public constructor() {
    }

    public ngOnChanges(changes: SimpleChanges): void {

    }

}
