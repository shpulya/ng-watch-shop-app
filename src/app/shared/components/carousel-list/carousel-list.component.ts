import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { IItem } from '../../../app.models';

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
export class CarouselListComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    public items: Array<IItem> = [];

    @Input()
    public readonly itemTemplate!: TemplateRef<any>;

    public activeIndex: number = 0;

    @ViewChild('btnPrev')
    private btnPrev!: ElementRef;

    @ViewChild('btnNext')
    private btnNext!: ElementRef;

    private destroy$: Subject<boolean> = new Subject();

    constructor() {}

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        fromEvent(this.btnPrev.nativeElement, 'click')
            .pipe(
                throttleTime(3000),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.reduceActiveIndex());
        fromEvent(this.btnNext.nativeElement, 'click')
            .pipe(
                throttleTime(3000),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.increaseActiveIndex());
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public increaseActiveIndex(): void {
        this.activeIndex = (this.activeIndex < this.items.length - 1) ? this.activeIndex + 1 : 0;

    }

    public reduceActiveIndex(): void {
        this.activeIndex = (this.activeIndex <= 0) ? this.items.length - 1 : this.activeIndex - 1;
    }
}
