import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { WatchesService } from '../../services/watches.service';
import { IWatch } from '../../app.models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public counter: number = 0;

    public overlay: boolean = false;

    public searchHints: Array<string> = [];

    public inputText: string = '';

    private destroy$: Subject<void> = new Subject();

    constructor(
        private cartService: CartService,
        private watchesService: WatchesService
    ) {}

    public ngOnInit(): void {
        this.cartService.items$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.counter = this.cartService.countItemsInCart();
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
        this.searchHints.push(text);
        this.watchesService.getSearchedItemsByName(text)
            .pipe(
                debounceTime(1000),
                takeUntil(this.destroy$)
            )
            .subscribe((watches: Array<IWatch>) => {
                this.searchHints = watches.map((watch: IWatch) => watch.name);
            })
        ;
    }

    public chooseHint(text: string): void {
        this.inputText = text;
        this.searchHints = [];
    }

    public cancelSearching(): void {
        this.overlay = false;
        this.searchHints = [];
    }
}
