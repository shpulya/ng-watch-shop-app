import { Component, ComponentFactoryResolver, Injector, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';

import { IItem } from '../../../../app.models';
import { CarouselItemComponent } from '../carousel-item/carousel-item.component';

@Component({
    selector: 'app-carousel2',
    template: ''
})
export class Carousel2Component implements OnChanges {

    @ViewChild('vc', { read: ViewContainerRef })
    public vc: any;

    @Input()
    private item!: IItem;

    constructor(
        private resolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private injector: Injector,
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        const {item} = changes;

        if (item) {
            const factory = this.resolver.resolveComponentFactory(CarouselItemComponent);
            const componentRef = factory.create(this.injector);
            componentRef.instance.item = this.item;
            this.vc.insert(componentRef.hostView);
        }
    }
}
