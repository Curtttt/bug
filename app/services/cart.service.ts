import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<number>(0);
  currenCart = this.cart.asObservable();
  total = new BehaviorSubject<any>([]);
  currentTotal = this.total.asObservable()

  constructor() {}

  updateCart(num: number) { this.cart.next(num); }
  updatePrice(price: any) { this.total.next(price); }

  addtoCart(product: any) {
    let id = product._id;
    if (sessionStorage.hasOwnProperty(id)) {
      let sl = JSON.parse(sessionStorage.getItem(id)!)['sl'];
      product['sl'] = sl + 1;
      sessionStorage.removeItem(id);
    }
    else product['sl'] = 1;

    sessionStorage.setItem(id, JSON.stringify(product));
  }

}
