import { Inject, Injectable, InjectionToken } from '@angular/core';

import { ItemsService } from './items.service';
import { ItemType } from '../../app.models';

export const ITEMS_SERVICES = new InjectionToken<Array<ItemsService>>('ITEMS_SERVICES');

@Injectable({
    providedIn: 'root'
})
export class ItemsFactoryService {

    public services: {[type: string]: ItemsService} = {};

    constructor(
        @Inject(ITEMS_SERVICES) services: Array<ItemsService>,
    ) {
        for (const service of services) {
            this.services[service.type] = service;
        }
    }

    public getService<ServiceT extends ItemsService>(type: ItemType): ServiceT {
        if (!this.hasService(type)) {
            throw new Error(`Trying to get nonexistent service of type "${type}"`);
        }

        return <ServiceT>this.services[type];
    }

    public getServices(): Array<ItemsService> {
        const services: Array<ItemsService> = [];

        for (const type of Object.keys(this.services)) {
            services.push(this.services[type]);
        }

        return services;
    }

    public hasService(type: ItemType): boolean {
        return this.services.hasOwnProperty(type);
    }
}
