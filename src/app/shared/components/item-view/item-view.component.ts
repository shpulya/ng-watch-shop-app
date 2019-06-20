import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Params } from '@angular/router';

import { ItemsViewService } from '../../../core/services/items-view.service';
import { IItem, ItemType, ItemView } from '../../../app.models';
import { ItemViewController } from './item-view.controller';

@Component({
    selector: 'app-item-view',
    template: ''
})
export class ItemViewComponent implements OnInit {

    @Input()
    private type!: ItemType;

    @Input()
    private view!: ItemView;

    @Input()
    private item!: IItem;

    @Input()
    private queryURLParams!: Params;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private itemViewService: ItemsViewService
    ) {}

    public ngOnInit(): void {
        console.log(this.view);
        const itemView = this.itemViewService.getComponent(this.type, this.view);
        const factory = this.componentFactoryResolver.resolveComponentFactory(itemView);
        const component = this.viewContainerRef.createComponent<ItemViewController<any>>(factory).instance;

        component.item = this.item;
        component.queryURLParams = this.queryURLParams;
    }
}
