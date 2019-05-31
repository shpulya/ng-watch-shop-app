import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {

    @Input()
    public message: string = '';

    public showTooltip: boolean = false;

    public show(): void {
        this.showTooltip = true;
        setTimeout(() => { this.showTooltip = false; }, 300);
    }
}
