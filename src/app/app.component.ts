import { Component, OnDestroy } from '@angular/core';

import { CartService } from './services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

    public isShowCart: boolean = false;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private cartService: CartService
    ) {
        this.cartService.opened$
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (isShow: boolean) => {
                    this.isShowCart = isShow;
                },
                () => alert(`Couldn't open Cart`)
            )
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
