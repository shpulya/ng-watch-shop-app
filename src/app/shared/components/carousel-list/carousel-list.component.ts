import {AfterViewInit, Component, Input, OnInit, TemplateRef} from '@angular/core';
import { IItem } from '../../../app.models';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import {fromEvent, Observable} from 'rxjs';
import {throttleTime} from 'rxjs/operators';

@Component({
    selector: 'app-carousel-list',
    templateUrl: './carousel-list.component.html',
    styleUrls: ['./carousel-list.component.scss'],
    animations: [
        trigger('slide', [
            transition(':increment', group([
                query(':enter, .slide__item, :leave', [
                    style({ transform: 'translateX(0)'}),
                    animate('3s', style({ transform: 'translateX(-100%)'}))
                ], { optional: true })
            ])),
            transition(':decrement', group([
                query(':enter, .slide__item, :leave', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('3s', style({ transform: 'translateX(0)'}))
                ], { optional: true })
            ]))
        ])
    ]
})
export class CarouselListComponent implements OnInit, AfterViewInit {

    @Input()
    public items: Array<IItem> = [];

    @Input()
    public readonly itemTemplate!: TemplateRef<any>;

    public activeIndex: number = 0;

    public source: Observable<any> = fromEvent(document, 'click');

    constructor() {}

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this.source.pipe(
            throttleTime(3000)
        );
    }

    public increaseActiveIndex(): void {
        this.activeIndex = (this.activeIndex < this.items.length - 1) ? this.activeIndex + 1 : 0;

    }

    public reduceActiveIndex(): void {
        this.activeIndex = (this.activeIndex <= 0) ? this.items.length - 1 : this.activeIndex - 1;
        console.log(this.activeIndex);
    }
}
