import { Component, OnInit, Input } from '@angular/core';
import { IWatch } from '../../../app.models';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-watches-grid-view',
    templateUrl: './watches-grid-view.component.html',
    styleUrls: ['./watches-grid-view.component.scss']
})
export class WatchesGridViewComponent implements OnInit {

    @Input() public readonly watch!: IWatch;

    constructor(private cartService: CartService) {
    }

    public ngOnInit(): void {
    }

    public addWatchToCart(watch: IWatch): void {
        this.cartService.addWatchToCart(watch);
    }

}
