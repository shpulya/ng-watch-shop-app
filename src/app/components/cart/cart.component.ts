import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public showCart!: boolean;

  constructor() { }

  public ngOnInit(): void {
  }

  public closeCart(): void {
      this.showCart = false;
  }

}
