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
            state('scroll', style({
                left: '{{scroll}}px',
            }), {params: {scroll: 0}}),
            transition('* => scroll', animate('300ms', keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(-300px)', offset: 0.5 })
            ])))
        ])]
})

export class MainPageComponent implements OnInit, OnDestroy {

    public categories: Array<string> = ['watches', 'wristbands'];

    public items: Array<IItem> = [];

    public state: string = '';

    public scroll: number = 0;

    public leftHidden: boolean = true;

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
        this.scroll = this.scroll - 400;

        if (this.scroll < -400 * this.items.length + 800) {
            this.rightHidden = true;
        }

        if (this.leftHidden) {
            this.leftHidden = false;
        }
    }

    public leftScroll(): void {
        this.state = 'scroll';
        this.scroll = this.scroll + 400;

        if (this.scroll >= 0) {
            this.leftHidden = true;
        }

        if (this.rightHidden) {
            this.rightHidden = false;
        }
    }
}
