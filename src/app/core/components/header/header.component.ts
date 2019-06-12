import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { WatchesService } from '../../../features/watches/services/watches.service';
import { IItem } from '../../../app.models';
import { WristbandsService } from '../../../features/wristbands/services/wristbands.service';

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

    constructor(
        private cartService: CartService,
        private watchesService: WatchesService,
        private wristbandsService: WristbandsService
    ) {}

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

                this.watchesService.getSearchedWatchesByName(searchText)
                    .pipe(
                        takeUntil(this.destroy$)
                    )
                    .subscribe(
                        (watches: Array<IItem>) => {
                            this.items = this.items.concat(watches);
                        },
                        () => {
                            alert(`Can't get items by name!`);
                        }
                    )
                ;

                this.wristbandsService.getSearchedWristbandsByName(searchText)
                    .pipe(
                        takeUntil(this.destroy$)
                    )
                    .subscribe(
                        (wristbands: Array<IItem>) => {
                            this.items = this.items.concat(wristbands);
                        },
                        () => {
                            alert(`Can't get items by name!`);
                        }
                    )
                ;
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
