import { Component, ComponentFactoryResolver, ComponentRef, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Params } from '@angular/router';

import { ItemsViewService } from '../../../core/services/items-view.service';
import { IItem, ItemType, ItemView } from '../../../app.models';
import { ItemViewController } from './item-view.controller';

@Component({
    selector: 'app-item-view',
    template: ''
})
export class ItemViewComponent implements OnChanges {

    @Input()
    private type!: ItemType;

    @Input()
    private view!: ItemView;

    @Input()
    private item!: IItem;

    @Input()
    private queryURLParams!: Params;

    private viewComponentRef!: ComponentRef<ItemViewController<any>>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private itemViewService: ItemsViewService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        const { type, view, item, queryURLParams } = changes;

        const setComponentBindings = () => {
            this.viewComponentRef.instance.item = this.item;
            this.viewComponentRef.instance.queryURLParams = this.queryURLParams;
        };

        if (type || view) {
            this.viewContainerRef.remove(0);
            const itemView = this.itemViewService.getComponent(this.type, this.view);
            const factory = this.componentFactoryResolver.resolveComponentFactory(itemView);

            this.viewComponentRef = this.viewContainerRef.createComponent<ItemViewController<any>>(factory);

            if (this.item || this.queryURLParams) {
                setComponentBindings();
            }
        }

        if (item || queryURLParams) {
            setComponentBindings();
        }
    }


}
