import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { ICart, IContacts, IItem } from '../../../app.models';
import { CartService } from '../../services/cart.service';


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    animations: [
        trigger('compression', [
            transition(':enter', [
                style({height: 0, color: '#d0d2d6'}),
                animate(1000, style({height: '*', color: '*'}))
            ]),
            transition(':leave', [
                animate(1000, style({height: 0, color: '#d0d2d6'}))
            ])
        ])
    ]
})
export class CheckoutComponent implements OnInit, OnDestroy {

    public contacts: IContacts = { city: '', region: '', email: '', name: '' };

    public contactsFilled: boolean = false;

    public deliveryFilled: boolean = false;

    public items: Map<string, ICart> = new Map();

    public itemsList: Array<IItem> = [];

    public is: boolean = true;

    public deliveryForm!: FormGroup;

    public isSure: boolean = false;

    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private cartService: CartService,
        private fb: FormBuilder
    ) {}

    public ngOnInit(): void {
        this.cartService.items$
            .pipe(takeUntil(this.destroy$))
            .subscribe((items: Map<string, ICart>) => {
                this.items = items;
                this.itemsList = Array.from(this.items.values()).map(item => item.item);
            })
        ;
        this.initForm();
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onContactsSubmit(): void {
        this.contactsFilled = !this.contactsFilled;
    }

    public onDeliverySubmit(): void {
        this.deliveryFilled = !this.deliveryFilled;
        this.cartService.deleteCart();
    }

    public getFinalSum(): number {
        return this.cartService.getFinalSum();
    }

    public showCart(): void {
        this.cartService.open();
    }

    private initForm(): void {
        this.deliveryForm = this.fb.group(
            {
                delivery: ['', Validators.required],
                payment: ['', Validators.required],
                isSure: false
            }
        );
    }
}
