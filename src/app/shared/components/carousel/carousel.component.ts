import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil, throttleTime } from 'rxjs/operators';

import { IItem } from '../../../app.models';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    animations: [
        trigger('slide', [
            transition(':increment', group([
                query(':enter, .slide__item, :leave', [
                    style({ transform: 'translateX(0)'}),
                    animate('0.3s ease-out', style({ transform: 'translateX(-100%)'}))
                ], { optional: true })
            ])),
            transition(':decrement', group([
                query(':enter, .slide__item, :leave', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('0.3s ease-out', style({ transform: 'translateX(0)'}))
                ], { optional: true })
            ]))
        ])
    ]
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    public items: Array<IItem> = [];

    @Input()
    public readonly itemTemplate!: TemplateRef<any>;

    public activeIndex: number = 0;

    public carouselItemsCount: number = 1;

    @Input()
    private resize!: boolean;

    @ViewChild('btnPrev')
    private btnPrev!: ElementRef;

    @ViewChild('btnNext')
    private btnNext!: ElementRef;

    private destroy$: Subject<void> = new Subject();

    private resize$: Subject<void> = new Subject();

    constructor() {}

    public ngOnInit(): void {
        if (!this.resize) {
            return;
        }

        this.resize$
            .pipe(
                debounceTime(100),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                if (window.innerWidth > 1300) {
                    this.carouselItemsCount = 4;
                }
                if (window.innerWidth < 1300) {
                    this.carouselItemsCount = 3;
                }
            });

        this.calculateItems();
    }

    public ngAfterViewInit(): void {
        fromEvent(this.btnPrev.nativeElement, 'click')
            .pipe(
                throttleTime(300),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.reduceActiveIndex());
        fromEvent(this.btnNext.nativeElement, 'click')
            .pipe(
                throttleTime(300),
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

    @HostListener('window:resize', ['$event'])
    private calculateItems(event?: Event): void {
        this.resize$.next();
    }
}
