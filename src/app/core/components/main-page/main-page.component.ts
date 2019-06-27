import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IItem } from '../../../app.models';
import { ITEMS_SERVICES } from '../../services/items-factory.service';
import { ItemsService } from '../../services/items.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { trigger, state, style, transition, animate, keyframes, query } from '@angular/animations';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    animations: [
        trigger('scrollAnimation', [
            state('i', style({
                left: '{{scroll}}px',
            }), {params: {scroll: 0}}),
            transition(':enter', [style({transform: 'translateX(-100%)'}), animate('0.5s 300ms ease-in')]),
            transition(':leave', [
                animate('0.3s ease-out', style({transform: 'translateX(100%)'}))
            ])
        ])]
})

export class MainPageComponent implements OnInit, OnDestroy {

    public categories: Array<string> = ['watches', 'wristbands'];

    public items: Array<IItem> = [];

    public state: number = 0;

    public scroll: number = 0;

    public activeIndex: number = 0;

    private services: Array<ItemsService> = [];

    private destroy$: Subject<void> = new Subject();

    constructor(
        @Inject(ITEMS_SERVICES) services: Array<ItemsService>
    ) {
        for (const service of services) {
            this.services.push(service);
        }
    }

    public ngOnInit(): void {
        for (const service of this.services) {
            service.getItems()
                .pipe(takeUntil(this.destroy$))
                .subscribe((items: Array<IItem>) => {
                    this.items = this.items.concat(items);
                });
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.complete();
        this.destroy$.complete();
    }

    public rightScroll(): void {
        this.activeIndex = (this.activeIndex > this.items.length - 1) ? 0 : this.activeIndex + 1;
    }

    public leftScroll(): void {
        this.activeIndex = (this.activeIndex > 0) ? this.activeIndex - 1 : this.items.length - 1;
    }
}
