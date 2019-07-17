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
    public readonly type!: ItemType;

    @Input()
    public readonly view!: ItemView;

    @Input()
    public readonly item!: IItem;

    @Input()
    public readonly queryURLParams!: Params;

    private viewComponentRef!: ComponentRef<ItemViewController<any>>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private itemViewService: ItemsViewService
    ) {
    }

    public ngOnChanges(changes: SimpleChanges): void {

        const {type, view, item, queryURLParams} = changes;
        const setComponentBindings = () => {
            // @ts-ignore
            this.viewComponentRef.instance.item = this.item;
            // @ts-ignore
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
