import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { fromEvent, Subject, merge } from 'rxjs';
import { debounceTime, filter, takeUntil, throttleTime } from 'rxjs/operators';

import { IItem } from '../../../app.models';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    animations: [
        trigger('slide', [
            transition(
                ':increment',
                    query('.container__item', [
                        style({transform: 'translate(0)'}),
                        animate('0.3s ease-in-out', style({transform: 'translate(-100%)'}))
                    ], { optional: true })
            ),
            transition(
                ':decrement',
                query('.container__item', [
                    style({transform: 'translate(-100%)'}),
                    animate('0.3s ease-in-out', style({transform: 'translate(0)'}))
                ], { optional: true })
            )
        ])
    ]
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    public readonly items: Array<IItem> = [];

    @Input()
    public readonly itemTemplate!: TemplateRef<any>;

    @Input()
    public readonly resize!: boolean;

    public activeIndex: number = 0;

    public itemsVisibleCount: number = 1;

    @ViewChild('btnPrev')
    private btnPrev!: ElementRef;

    @ViewChild('btnNext')
    private btnNext!: ElementRef;

    private destroy$: Subject<void> = new Subject();

    private resize$: Subject<void> = new Subject();

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
                    this.itemsVisibleCount = 4;
                }
                if (window.innerWidth < 1300) {
                    this.itemsVisibleCount = 3;
                }
            });

        this.calculateItems();
    }

    public ngAfterViewInit(): void {
        merge<KeyboardEvent, MouseEvent>(
            fromEvent(this.btnPrev.nativeElement, 'click'),
            fromEvent(this.btnNext.nativeElement, 'click'),
            fromEvent<KeyboardEvent>(document, 'keydown'))
            .pipe(
                filter((event: KeyboardEvent | MouseEvent) => {
                    if (event instanceof KeyboardEvent) {
                        return event.key === 'Left'
                            || event.key === 'ArrowLeft'
                            || event.key === 'Right'
                            || event.key === 'ArrowRight'
                        ;
                    }

                    return true;
                }),
                throttleTime(500),
                takeUntil(this.destroy$)
            )
            .subscribe(event => {
                if ((event.target === this.btnPrev.nativeElement)
                    || (event instanceof KeyboardEvent && (event.key === 'Left' || event.key === 'ArrowLeft'))
                ) {
                    this.reduceActiveIndex();
                }

                if ((event.target === this.btnNext.nativeElement)
                    || (event instanceof KeyboardEvent && (event.key === 'Right' || event.key === 'ArrowRight'))
                ) {
                    this.increaseActiveIndex();
                }
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public increaseActiveIndex(): void {
        this.activeIndex = (this.activeIndex < this.items.length - 1)
            ? this.activeIndex + 1
            : this.activeIndex
        ;
    }

    public reduceActiveIndex(): void {
        this.activeIndex = (this.activeIndex <= 0)
            ? this.activeIndex
            : this.activeIndex - 1
        ;
    }

    public hideNextBtn(): boolean {
        return (this.activeIndex === this.items.length - this.itemsVisibleCount || this.items.length <= this.itemsVisibleCount);
    }

    @HostListener('window:resize', ['$event'])
    private calculateItems(): void {
        this.resize$.next();
    }
}
