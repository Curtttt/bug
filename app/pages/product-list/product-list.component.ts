import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { productAPIService } from '../../services/product-api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationService } from 'ngx-pagination';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit, OnDestroy {
  p: number = 1;
  db: any = {}; all_products: any = [];
  fil_products: any = [];
  categories: any = [];
  price_fil_: any = 200000;
  category_fil_: string = "all";
  star_fil_: Number = 0;
  currentRoute: any = "all";
  currentCategory: any = "all";
  route_subscript!: Subscription;

  constructor(private _service: productAPIService, private paginationService: PaginationService, private _activatedRoute: ActivatedRoute, private router: Router, private _cartService: CartService) { }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    let route_lst = this._service.get_routesList();
    this.db = this._service.db;
    this.categories = this._service.categories;
    this.all_products = this._service.all_products;

    this._activatedRoute.params.subscribe((params) => {
      scrollTo(0, 0);
      this.currentRoute = params['collection'];
      if (this.currentRoute == "Be-Pretty")
        this.currentCategory = "Be Pretty"
      else this.currentCategory = Object.keys(route_lst).find(key => route_lst[key] == this.currentRoute);
      this.fil_products = this.db[this.currentCategory];
    });
  }

  category_fil(tg: string) {
    this.category_fil_ = tg;
    this.currentRoute = this._service.get_routesList()[tg];
    this.currentCategory = tg;
    this.main_fil();
    this.router.navigate([`/products/${this._service.get_routesList()[tg]}`]);
  }

  star_fil(tg: number) {
    this.star_fil_ = tg;
    this.main_fil();
  }

  price_fil(event: any) {
    this.price_fil_ = 200000 * event.target.value;
    this.main_fil();
  }

  filledStars(num: number) {
    return Array(num).fill(0).map((x, i) => i + 1);
  }

  main_fil(): void {
    this.fil_products = this.db[this.category_fil_];

    if (this.star_fil_ != 0)
      this.fil_products = this.fil_products.filter((product: any) => product.Rating == this.star_fil_ && product.UnitPrice >= this.price_fil_);
    else
      this.fil_products = this.fil_products.filter((product: any) => product.UnitPrice >= this.price_fil_);

    this.p = 1;
  }

  savetoCart(p: any){
    this._cartService.addtoCart(p);
    this._cartService.updateCart(this._cartService.cart.getValue() + 1);
  }

  calcSale(newP: number, oldP: number) { return 100 - Math.floor(newP / oldP * 100); }

}