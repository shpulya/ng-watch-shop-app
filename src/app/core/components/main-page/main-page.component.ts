import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IItem } from '../../../app.models';
import { ITEMS_SERVICES } from '../../services/items-factory.service';
import { ItemsService } from '../../services/items.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    animations: [
        trigger('scrollAnimation', [
            state('scroll', style({
                transform: 'translate({{scroll}}px)',
            }), {params: {scroll: 0}}),
            transition('* => scroll', animate('300ms'))
        ])
    ]
})
export class MainPageComponent implements OnInit, OnDestroy {

    public categories: Array<string> = ['watches', 'wristbands'];

    public items: Array<IItem> = [];

    public state: string = 'any';

    public scroll: number = 0;

    public leftHidden: boolean = false;

    public rightHidden: boolean = false;

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
        this.state = 'scroll';
        this.scroll = this.scroll - 250;

        if (this.scroll <= -250 * this.items.length - 500) {
            this.rightHidden = true;
        }

        if (this.leftHidden) {
            this.leftHidden = false;
        }
    }

    public leftScroll(): void {
        this.state = 'scroll';
        this.scroll = this.scroll + 250;

        if (this.scroll >= 500) {
            this.leftHidden = true;
        }

        if (this.rightHidden) {
            this.rightHidden = false;
        }
    }
}
