import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemView } from '../../../app.models';

export enum OrderBy {
    Asc = 'asc',
    Desk = 'desk'
}

@Component({
    selector: 'app-mode-view-menu',
    templateUrl: './mode-view-menu.component.html',
    styleUrls: ['./mode-view-menu.component.scss']
})
export class ModeViewMenuComponent {

    @Output('onsortchange')
    public readonly sortingChangeEvent: EventEmitter<OrderBy> = new EventEmitter();

    @Output('onviewchange')
    public readonly viewChangeEvent: EventEmitter<ItemView> = new EventEmitter();

    @Input()
    public readonly header!: string;

    public viewMode: ItemView = ItemView.Grid;

    public grid: ItemView = ItemView.Grid;

    public list: ItemView = ItemView.List;

    public asc: OrderBy = OrderBy.Asc;

    public desk: OrderBy = OrderBy.Desk;

    constructor(
        private route: ActivatedRoute
    ) { }

    public orderItems(order: OrderBy): void {
        this.sortingChangeEvent.emit(order);
    }

    public changeViewMode(view: ItemView): void {
        this.viewMode = view;
        this.viewChangeEvent.emit(view);
    }
}
