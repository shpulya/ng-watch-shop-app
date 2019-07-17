import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {

    @Input()
    public readonly message: string = '';

    public shown: boolean = false;

    public show(): void {
        this.shown = true;
        setTimeout(() => { this.shown = false; }, 300);
    }
}
