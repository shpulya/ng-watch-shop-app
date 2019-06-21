import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IItem } from '../../../app.models';
import { ITEMS_SERVICES } from '../../services/items-factory.service';
import { ItemsService } from '../../services/items.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    animations: [
        trigger('scrollAnimation', [
            state('left', style({
                transform: 'translate(120px)',
            })),
            state('right', style({
                transform: 'translate(-120px)',
            })),
            transition('right => left', animate('300ms')),
            transition('left => right', animate('300ms'))
        ]),

    ]
})
export class MainPageComponent implements OnInit, OnDestroy {

    public categories: Array<string> = ['watches', 'wristbands'];

    public items: Array<IItem> = [];

    public state: string = 'right';

    public right: number = 0;

    public left: number = 0;

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
        console.log(this.services);
        for (const service of this.services) {
            service.getItems()
                .pipe(takeUntil(this.destroy$))
                .subscribe((items: Array<IItem>) => {
                    this.items = this.items.concat(items);
                    console.log(this.items);
                });
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.complete();
        this.destroy$.complete();
    }

    public leftScroll(): void {
        this.state = 'left';
    }

    public rightScroll(): void {
        this.state = 'right';
    }
}
