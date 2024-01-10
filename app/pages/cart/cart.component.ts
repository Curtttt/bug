import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { productAPIService } from '../../services/product-api.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit, OnDestroy {
  cart_lst: any; sl_lst: any;
  sum!: number; oldSum!: number

  constructor(private router: Router, private _service: CartService) { }

  ngOnDestroy(): void {
    for (let i = 0; i < this.cart_lst.length; i++) {
      if (this.cart_lst[i]['sl'] != this.sl_lst[i]) {
        this.cart_lst[i]['sl'] = this.sl_lst[i];
      if (this.cart_lst[i]['sl'] != 0)
        sessionStorage.setItem(this.cart_lst[i]['_id'], JSON.stringify(this.cart_lst[i]));
      }
    }
  }

  ngOnInit(): void {
    this.cart_lst = []; this.sl_lst = []
    let allItems = Object.entries(sessionStorage);

    for (let i = 0; i < allItems.length; i++) {
      this.cart_lst.push(JSON.parse(allItems[i][1]));
      this.sl_lst.push(this.cart_lst[i]['sl']);
    }

    this.total();
  }

  total() {
    this.sum = 0; this.oldSum = 0;
    for (let i = 0; i < this.sl_lst.length; i++){
      this.sum += this.sl_lst[i] * this.cart_lst[i]['UnitPrice'];
      if (this.cart_lst[i]['OldPrice'] != null)
        this.oldSum += this.sl_lst[i] * this.cart_lst[i]['OldPrice'];
      else this.oldSum += this.sl_lst[i] * this.cart_lst[i]['UnitPrice'];
    }
  }

  checkOut() {
    this._service.updatePrice([this.oldSum, this.oldSum-this.sum, this.sum])
    this.router.navigate(['checkout']);
  }

  updateCart(idx: number, equation: any) {
    if (equation == "+")
      this.sl_lst[idx] += 1;
    else this.sl_lst[idx] -= 1;
    let sum = this.sl_lst.reduce((a: number, b: number) => a + b, 0);
    this._service.updateCart(sum);
    this.total();
  }

  delete(id: string, idx: number){
    sessionStorage.removeItem(id);
    this._service.updateCart(this._service.cart.getValue() - this.sl_lst[idx])
    this.sl_lst[idx] = 0;
  }
}
