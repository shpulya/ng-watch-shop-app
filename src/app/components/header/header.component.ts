import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { CartService } from '../../services/cart.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public counter: number = 0;

    public alive: boolean = true;

    constructor(
        private cartService: CartService
    ) {
    }

    public ngOnInit(): void {
        this.getCounter();
    }

    public ngOnDestroy(): void {
        this.alive = false;
    }

    public getCounter(): void {
        this.cartService.countWatches$
            .pipe(
                takeWhile(() => this.alive)
            )
            .subscribe((countWatches) => {
                this.counter = countWatches;
            })
        ;
    }

    public showCart(): void {
        if (this.counter) {
            this.cartService.isShowCart$.next(true);
        }
    }

}
