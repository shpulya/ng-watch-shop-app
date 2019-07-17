import { Inject, Injectable, InjectionToken, Type } from '@angular/core';

import { ItemType, ItemView } from '../../app.models';

export const ITEMS_VIEW_COMPONENTS = new InjectionToken<Array<IItemView>>('ITEMS_VIEW_COMPONENTS');

export interface IItemView extends Type<any> {
    type: ItemType;
    view: ItemView;
}

@Injectable({
    providedIn: 'root'
})
export class ItemsViewService {

    private components: {[type: string]: {[view: string]: IItemView}} = {};

    constructor(
        @Inject(ITEMS_VIEW_COMPONENTS) components: Array<IItemView>
    ) {
        for (const component of components) {
            if (!this.components[component.type]) {
                this.components[component.type] = {};
            }

            this.components[component.type][component.view] = component;
        }
    }

    public getComponent(type: ItemType, view: ItemView): IItemView {
        if (!this.hasComponent(type, view)) {
            throw new Error(`Trying to catch nonexistent component`);
        }

        return this.components[type][view];
    }

    public hasComponent(type: ItemType, view: ItemView): boolean {
        return this.components.hasOwnProperty(type) && this.components[type].hasOwnProperty(view);
    }
}
