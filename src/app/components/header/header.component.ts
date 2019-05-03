import { Component, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Output()
    public showCartEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

    public counter: number = 0;

    constructor(private cartService: CartService) {
    }

    public getCounter(): number {
        this.counter = this.cartService.countWatchesItemInList();

        return this.counter;
    }

    public showCart(): void {
        if (this.getCounter()) {
            this.showCartEmit.emit(true);
        }
    }

}
