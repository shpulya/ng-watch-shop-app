import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { IItem } from '../../../app.models';
import { ItemsService } from '../../services/items.service';
import { ITEMS_SERVICES } from '../../services/items-factory.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public counter: number = 0;

    public overlay: boolean = false;

    public items: Array<IItem> = [];

    public inputText: string = '';

    public showExtraItems: boolean = false;

    private search$: Subject<string> = new Subject();

    private destroy$: Subject<void> = new Subject();

    private services: Array<ItemsService> = [];

    constructor(
        private cartService: CartService,
        @Inject(ITEMS_SERVICES) services: Array<ItemsService>
    ) {
        for (const service of services) {
            this.services.push(service);
        }
    }

    public ngOnInit(): void {
        this.cartService.items$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.counter = this.cartService.countItemsInCart())
        ;

        this.search$
            .pipe(
                debounceTime(300),
                takeUntil(this.destroy$)
            )
            .subscribe((searchText: string) => {
                this.showExtraItems = false;
                this.overlay = true;
                this.inputText = searchText;
                this.items = [];

                for (const service of this.services) {
                    service.findItemsByName(searchText)
                        .pipe(
                            takeUntil(this.destroy$)
                        )
                        .subscribe(
                            (items: Array<IItem>) => {
                                this.items = this.items.concat(items);
                            },
                            () => {
                                alert(`Can't get items by name!`);
                            }
                        )
                    ;
                }
            })
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public showCart(): void {
        if (this.counter) {
            this.cartService.open();
        }
    }

    public showHint(text: string): void {
        this.search$.next(text);
        document.body.style.overflow = 'hidden';
    }

    public cancelSearching(): void {
        this.overlay = false;
        this.items = [];
        document.body.style.overflow = 'auto';
    }

    public clearEditField(): void {
        this.inputText = '';
    }
}
