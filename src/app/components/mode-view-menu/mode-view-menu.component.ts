import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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

    public searchHints: Array<string> = [];

    constructor(
        private router: Router
    ) { }

    public ngOnInit(): void {
    }

    public orderItems(order: string): void {
        this.sorting.emit(order);
    }

    public changeViewMode(view: string): void {
        this.view.emit(view);
    }

    public hideOverlay(): void {
        this.overlay.emit(false);
    }

    public showOverlay(): void {
        this.overlay.emit(true);
    }
}
