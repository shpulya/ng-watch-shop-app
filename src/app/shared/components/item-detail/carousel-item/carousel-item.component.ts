import { Component, Input, OnInit } from '@angular/core';
import { IItem } from '../../../../app.models';

@Component({
    selector: 'app-carousel-item',
    templateUrl: './carousel-item.component.html',
    styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {

    @Input()
    public item!: IItem;

    constructor() {}

    public ngOnInit(): void {
    }
}
