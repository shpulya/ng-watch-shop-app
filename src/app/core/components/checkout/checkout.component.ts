import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {map, takeUntil} from 'rxjs/operators';

import { ICart, IContacts, IItem } from '../../../app.models';
import { CartService } from '../../services/cart.service';
import {CheckoutService} from '../../services/checkout.service';


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

    public cities: Array<any> = [];

    public regions: Array<any> = [];

    public searchedRegions: Array<any> = [];

    public searchedCities: Array<string> = [];

    public overlay: boolean = false;

    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private cartService: CartService,
        private checkoutService: CheckoutService,
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

        this.checkoutService.getRegions().subscribe((result: any) => {
            this.regions = result.data;
            console.log(this.regions);
        })

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

    public searchRegions(search: string): void {
        this.overlay = true;
        const pattern = new RegExp(`\^` + search, 'i');
        this.searchedRegions = this.regions.filter((region: any) => region.Description.match(pattern));
    }

    public searchCities(search: string): void {
        this.overlay = true;
        const pattern = new RegExp(`\^` + search, 'i');
        this.searchedCities = this.cities.filter((city: any, pos: number) =>
            (city.match(pattern) && this.cities.indexOf(city) === pos)
        );
    }

    public selectRegion(region: any): void {
        this.contacts.region = region.Description;
        this.searchedRegions = [];
        this.checkoutService.getCities(region.Ref).subscribe((result: any) => {
            this.cities = result.data.map((city: any) => city.Description);
            console.log(result.data);
        });
    }

    public selectCity(city: string): void {
        this.contacts.city = city;
        this.searchedCities = [];
    }

    public closeSelection(): void {
        this.searchedRegions = [];
        this.searchedCities = [];
        this.overlay = false;
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
