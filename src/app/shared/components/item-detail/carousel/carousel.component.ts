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
                style({ transform: 'translateX(0)' }),
                style({ transform: 'translateX(100%)' }),
                animate(300)
            ]),
            transition(':leave', [
                style({ transform: 'translateX(-100%)' }),
                animate(300)
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
