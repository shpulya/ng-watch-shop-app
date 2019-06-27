import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { IItem } from '../../../../app.models';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    animations: [
        trigger('slide', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1s', style({ opacity: 1}))
            ]),
            transition(':leave', [
                animate('1s', style({opacity: 0}))
            ])
        ])
    ]
})
export class CarouselComponent implements OnInit {

    @Input()
    public items: Array<IItem> = [];

    @Input()
    public readonly itemTemplate!: TemplateRef<any>;

    public activeIndex: number = 0;

    constructor() {}

    public ngOnInit(): void {}

    public increaseActiveIndex(): void {
        this.activeIndex = (this.activeIndex < this.items.length - 1) ? this.activeIndex + 1 : 0;
    }

    public reduceActiveIndex(): void {
        this.activeIndex = (this.activeIndex <= 0) ? this.items.length - 1 : this.activeIndex - 1;
    }
}
