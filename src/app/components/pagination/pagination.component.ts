import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

    @Input()
    public itemsCount!: number;

    @Input()
    public readonly countOnPage!: number;

    @Input()
    public currentPage!: number;

    @Output()
    public onPageUpdate: EventEmitter<number> = new EventEmitter<number>();

    public countPages: number = 0;

    public pages: Array<number> = [];

    public ngOnChanges(changes: SimpleChanges): void {
        const {itemsCount} = changes;

        if (itemsCount) {
            this.countPages = Math.ceil(itemsCount.currentValue / this.countOnPage);
        }
        this.pages = [];

        for (let i = 1; i < this.countPages + 1; i++) {
            this.pages.push(i);
        }
    }

    public changeActivePage(page: number): void {
        this.onPageUpdate.emit(page);
    }

}
