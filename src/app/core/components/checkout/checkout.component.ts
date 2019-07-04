import { Component, OnInit } from '@angular/core';
import { IContacts, IDelivery } from '../../../app.models';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    public contacts!: IContacts;

    public deliveryInfo!: IDelivery;

    public contactsFilled: boolean = false;

    constructor() { }

    public ngOnInit(): void {}

    public onContactsSubmit(): void {
        this.contactsFilled = true;
    }

    public onDeliverySubmit(): void {

    }
}
