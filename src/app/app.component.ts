import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isShowCart: boolean = false;

  public showCart(emit$: boolean): void {
      this.isShowCart = emit$;
  }

}
