import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { IItem } from '../../../app.models';
import { ItemsService } from '../../services/items.service';
import { ITEMS_SERVICES } from '../../services/items-factory.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('searchInput')
    public searchInput!: ElementRef;

    public counter: number = 0;

    public overlay: boolean = false;

    public items: Array<IItem> = [];

    public inputText: string = '';

    public showExtraItems: boolean = false;

    public queryParams!: Params;

    private search$: Subject<string> = new Subject();

    private destroy$: Subject<void> = new Subject();

    private services: Array<ItemsService> = [];

    constructor(
        private cartService: CartService,
        private router: Router,
        private route: ActivatedRoute,
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

    public ngAfterViewInit(): void {
        fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keydown')
            .pipe(filter((event: KeyboardEvent) => event.key === 'Enter'))
            .subscribe((event: KeyboardEvent) => {
                this.cancelSearching();
            });

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
        const qp = { ...this.route.snapshot.queryParams };

        document.body.style.overflow = 'auto';
        qp['searchedText'] = this.inputText;
        this.router.navigateByUrl(
            this.router.createUrlTree(
                ['searched'], {queryParams: qp}
            )
        );
    }

    public clearEditField(): void {
        this.inputText = '';
    }
}
