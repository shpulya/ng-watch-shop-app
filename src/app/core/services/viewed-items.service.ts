import { Injectable } from '@angular/core';
import { IItem, ItemType } from '../../app.models';
import { BehaviorSubject } from 'rxjs';
import { ItemsFactoryService } from './items-factory.service';
import { CookiesService } from './cookies.service';

@Injectable({
    providedIn: 'root'
})
export class ViewedItemsService {

    public viewedItems$: BehaviorSubject<Array<IItem>> = new BehaviorSubject<Array<IItem>>([]);

    constructor(
        private itemsFactoryService: ItemsFactoryService,
        private cookiesService: CookiesService
    ) {
        this.receiveViewedItems();
    }

    public receiveViewedItems(): void {
        if (!this.cookiesService.getCookie('viewedItems')) {
            return;
        }

        const itemsId = this.cookiesService.getCookie('viewedItems').split(',');
        const items: Array<IItem> = [];

        itemsId.forEach((id: string) => {
            const parsedId = this.cookiesService.parseUniqueId(id);
            const itemsService = this.itemsFactoryService.getService(<ItemType>parsedId.type);

            itemsService
                .getItemById(parsedId.id)
                .subscribe((i: IItem | null) => {
                    if (i) {
                        items.push(i);
                        this.viewedItems$.next(items);
                    }
                });
        });
    }
}
