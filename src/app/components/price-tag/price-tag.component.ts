import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-price-tag',
    templateUrl: './price-tag.component.html',
    styleUrls: ['./price-tag.component.scss']
})
export class PriceTagComponent {

    @Input()
    public readonly price!: number;

    @Input()
    public scale: number = 1;

    constructor() {
    }
}
