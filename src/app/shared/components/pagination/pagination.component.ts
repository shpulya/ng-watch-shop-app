import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

    @Input()
    public readonly itemsCount!: number;

    @Input()
    public readonly countOnPage!: number;

    @Input()
    public readonly currentPage!: number;

    @Output('onpageupdate')
    public readonly pageUpdateEvent: EventEmitter<number> = new EventEmitter<number>();

    public pagesCount: number = 0;

    public pages: Array<number> = [];

    public ngOnChanges(changes: SimpleChanges): void {
        const {itemsCount} = changes;

        this.pages = [];

        if (itemsCount) {
            this.pagesCount = Math.ceil(itemsCount.currentValue / this.countOnPage);
        }

        for (let i = 1; i < this.pagesCount + 1; i++) {
            this.pages.push(i);
        }
    }

    public changeActivePage(page: number): void {
        this.pageUpdateEvent.emit(page);
    }

}
