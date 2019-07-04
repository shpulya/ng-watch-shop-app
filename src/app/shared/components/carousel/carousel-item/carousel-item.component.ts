import { Component, Input } from '@angular/core';

import { IItem } from '../../../../app.models';

@Component({
    selector: 'app-carousel-item',
    templateUrl: './carousel-item.component.html',
    styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent {

    @Input()
    public item!: IItem;
}
