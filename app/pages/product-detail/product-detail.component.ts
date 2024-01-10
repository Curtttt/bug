import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { productAPIService } from '../../services/product-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  related_products: any;
  route_lst = this._service.get_routesList()
  img: any; img_lst: any; idx: number = 0;
  product: any; reviews: any; keys: any;
  category: string = ""; num: number = 1;
  tab: string = "description";
  isClicked1: boolean = true;
  isClicked2: boolean = false;
  fav_: boolean = false;
  sizeable: boolean = false;
  collection_route: any;

  constructor(private _service: productAPIService, private _activatedRoute: ActivatedRoute, private _cartService: CartService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      scrollTo(0, 0);
      let id = params['id']; this.collection_route = params['collection'];
      this.product = this._service.get_productDetail(id);
      let collection = Object.keys(this.route_lst).find(key => this.route_lst[key] == params['collection']);
      this.related_products = this._service.get_randomProducts(this._service.db[collection!], this.product);
      if (this.product.hasOwnProperty('Review'))
        this.keys = Object.keys(this.product.Review);
      else this.keys = [];
      this.img_lst = Object.values(this.product.images);
      this.img = this.img_lst[0];


      if (typeof this.product.Category != "string") {
        this.category = Object.values(this.product.Category).join(', ');
        this.sizeable = (this.product.Category[0] == "Nhẫn");
      }
      else {
        this.category = this.product.Category;
        this.sizeable = (this.product.Category == "Nhẫn");
      }
    });
  }


  sl(equation: any) {
    if (equation == "+")
      this.num += 1;
    else this.num -= 1;
  }

  fav() {
    this.fav_ = !this.fav_;
  }

  calcSale(newP: number, oldP: number) { return 100 - Math.floor(newP / oldP * 100); }

  changeTab(currentTab: string) {
    if (currentTab == "review") {
      this.isClicked2 = true;
      this.isClicked1 = !this.isClicked2;
      this.tab = "review";
    }
    else {
      this.isClicked1 = true;
      this.isClicked2 = !this.isClicked1;
      this.tab = "description";
    }
  }

  filledStars(num: number) {
    return Array(num).fill(0).map((x, i) => i + 1);
  }

  active_img(i: number) {
    if (this.idx == i)
      return true;
    else return false;
  }

  switch_img(operation: string) {
    if (this.idx < 1 && operation == "-")
      this.idx = this.idx + (this.img_lst.length - 1);
    else if (this.idx > (this.img_lst.length - 2) && operation == "+")
      this.idx = this.idx - (this.img_lst.length - 1);
    else
      if (operation == "+")
        this.idx++;
      else this.idx--;

    this.rend_img(this.idx);
  }

  rend_img(idx: number) {
    this.idx = idx;
    this.img = this.img_lst[idx];
  }

  savetoCart(p: any){
    this._cartService.addtoCart(p);
    this._cartService.updateCart(this._cartService.cart.getValue() + 1);
  }
}