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
                throttleTime(300),
                takeUntil(this.destroy$)
            )
            .subscribe(event => {
                if (event instanceof KeyboardEvent) {
                    (event.key === 'Left' || event.key === 'ArrowLeft')
                        ? this.reduceActiveIndex()
                        : this.increaseActiveIndex()
                    ;

                    return;
                }

                (event.target === this.btnNext.nativeElement)
                    ? this.increaseActiveIndex()
                    : this.reduceActiveIndex()
                ;

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

    @HostListener('window:resize', ['$event'])
    private calculateItems(event?: Event): void {
        this.resize$.next();
    }
}
