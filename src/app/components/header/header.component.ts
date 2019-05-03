import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    @Output()
    public showCartEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

    public counter: number = 0;

    public alive: boolean = true;

    constructor(private cartService: CartService) {
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
            this.showCartEmit.emit(true);
        }
    }

}
