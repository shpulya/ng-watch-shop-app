import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input()  public watchesCount!: number;

    @Input() public readonly countOnPage!: number;

    @Input() public currentPage!: number;

    @Output() public $activePageEvent: any = new EventEmitter<number>();

    public countPages: number = 0;

    public pages: Array<number> = [];

    constructor() {
    }

    public ngOnInit(): void {
        this.countPages = Math.ceil(this.watchesCount / this.countOnPage);

        for (let i = 1; i < this.countPages + 1; i++) {
            this.pages.push(i);
        }
    }

    public changeActivePage(page: number): void {
        this.currentPage = page;
        this.$activePageEvent.emit(this.currentPage);
    }

}
