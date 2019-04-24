import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Output() public $showCartEmit: any = new EventEmitter<boolean>();

    public counter!: number;

    constructor(private cartService: CartService) {
    }

    public ngOnInit(): void {
        this.counter = this.cartService.countWatchesItemInList();
    }

    public showCart(): void {
        this.$showCartEmit.emit(true);
    }

}
