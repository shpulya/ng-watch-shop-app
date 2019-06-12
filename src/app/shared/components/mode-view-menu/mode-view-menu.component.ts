import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-mode-view-menu',
    templateUrl: './mode-view-menu.component.html',
    styleUrls: ['./mode-view-menu.component.scss']
})
export class ModeViewMenuComponent implements OnInit {

    @Output()
    public sorting: EventEmitter<string> = new EventEmitter();

    @Output()
    public view: EventEmitter<string> = new EventEmitter();

    @Output()
    public overlay: EventEmitter<boolean> = new EventEmitter();

    public viewMode: string = 'grid';

    public header: string = '';

    constructor(
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this.header = this.route.snapshot.url[0].path;
    }

    public orderItems(order: string): void {
        this.sorting.emit(order);
    }

    public changeViewMode(view: string): void {
        this.viewMode = view;
        this.view.emit(view);
    }
}
