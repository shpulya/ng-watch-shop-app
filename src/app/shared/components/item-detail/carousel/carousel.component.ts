import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { IItem } from '../../../../app.models';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

    @Input()
    public items: Array<IItem> = [];

    @Input()
    public readonly itemTemplate!: TemplateRef<any>;

    constructor() { }

    public ngOnInit(): void {}

}
