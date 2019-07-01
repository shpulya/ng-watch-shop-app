import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { IItem } from '../../../app.models';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    animations: [
        trigger('slide', [
            transition(':increment', group([
                query(':enter', [
                    style({ transform: 'translateX(100%)', position: 'absolute'}),
                    animate('3s', style({ transform: 'translateX(0)', position: 'absolute' }))
                ]),
                query(':leave', [
                    style({ transform: 'translateX(0)', position: 'absolute'}),
                    animate('3s', style({ transform: 'translateX(-100%)', position: 'absolute' }))
                ])
            ])),
            transition(':decrement', group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)', position: 'absolute' }),
                    animate('3s', style({ transform: 'translateX(0)', position: 'absolute' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0)', position: 'absolute'}),
                    animate('3s', style({ transform: 'translateX(100%)', position: 'absolute' }))
                ], { optional: true })
            ]))
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
        console.log(this.activeIndex);
    }

    public reduceActiveIndex(): void {
        this.activeIndex = (this.activeIndex <= 0) ? this.items.length - 1 : this.activeIndex - 1;
        console.log(this.activeIndex);
    }
}
