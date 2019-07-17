import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';

import { IItem } from '../../../../app.models';
import { ItemsService } from '../../../services/items.service';
import { ITEMS_SERVICES } from '../../../services/items-factory.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

    @ViewChild('searchInput')
    public searchInput!: ElementRef;

    public overlay: boolean = false;

    public items: Array<IItem> = [];

    public inputText: string = '';

    public showExtraItems: boolean = false;

    public queryParams!: Params;

    private search$: Subject<string> = new Subject();

    private destroy$: Subject<void> = new Subject();

    private services: Array<ItemsService> = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        @Inject(ITEMS_SERVICES) services: Array<ItemsService>
    ) {
        for (const service of services) {
            this.services.push(service);
        }
    }

    public ngOnInit(): void {
        this.search$
            .pipe(
                debounceTime(300),
                takeUntil(this.destroy$),
                distinctUntilChanged()
            )
            .subscribe((searchText: string) => {
                this.changeSearchInput(searchText);
            })
        ;
    }

    public ngAfterViewInit(): void {
        fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keydown')
            .pipe(filter((event: KeyboardEvent) => event.key === 'Enter'))
            .subscribe((event: KeyboardEvent) => {
                this.cancelSearching('searched');
            });
    }

    public showHint(text: string): void {
        this.search$.next(text);
        document.body.style.overflow = 'hidden';
    }

    public cancelSearching(url: string): void {
        const qp = { ...this.route.snapshot.queryParams };

        this.overlay = false;
        this.items = [];
        document.body.style.overflow = 'auto';
        qp['searchedText'] = this.inputText;
        this.router.navigateByUrl(
            this.router.createUrlTree(
                [url], {queryParams: qp}
            )
        );
        this.inputText = '';
    }

    public navigate(item: IItem): void {

        this.router.navigateByUrl(`${item.type}/${item.id}`);
    }

    private changeSearchInput(searchText: string): void {
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
    }
}
