import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-price-tag',
    templateUrl: './price-tag.component.html',
    styleUrls: ['./price-tag.component.scss']
})
export class PriceTagComponent implements OnInit {

    @Input()
    public readonly price!: number;

    constructor() {
    }

    public ngOnInit(): void {
    }

}
