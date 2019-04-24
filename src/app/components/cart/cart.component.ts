import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {IWatch} from '../../app.models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    @Output() public $showCartEmit: any = new EventEmitter<boolean>();

    public watches!: any;

    constructor(private cartService: CartService) {
    }

    public ngOnInit(): void {
        this.watches = this.cartService.cartList$;
    }

    public closeCart(): void {
        this.$showCartEmit.emit(false);
    }

    public reduceWatchesCount(watch: IWatch): void {
        this.cartService.deleteWatchFromCart(watch);
    }

    public increaseWatchesCount(watch: IWatch): void {
        this.cartService.addWatchToCart(watch);
    }
}
