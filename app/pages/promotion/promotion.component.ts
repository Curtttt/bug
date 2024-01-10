import { Component, ElementRef, HostListener, NgZone, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productAPIService } from '../../services/product-api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-promotion-page',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  tetproducts: any;
  beprettyproducts: any;
  errMessage: string = ''
  constructor(private _service: productAPIService, private _cartService: CartService,
    private http: HttpClient,
    private renderer: Renderer2,
    private el: ElementRef,
    private zone: NgZone) {
  }
  ngOnInit(): void {
    this._service.get_products("bepretty").subscribe(res => this.beprettyproducts = res);
    this._service.get_products("tet-products").subscribe(res => this.tetproducts = res);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.zone.runOutsideAngular(() => {
      this.reveal();
    });
  }

  reveal() {
    if (typeof window !== 'undefined') {
      const reveals = this.el.nativeElement.querySelectorAll('.reveal');
      const reveal2s = this.el.nativeElement.querySelectorAll('.reveal2');
  
      const windowheight = window.innerHeight;
      const revealpoint = 150;
  
      for (let i = 0; i < reveals.length; i++) {
        const revealtop = reveals[i].getBoundingClientRect().top;
  
        if (revealtop < windowheight - revealpoint) {
          this.renderer.addClass(reveals[i], 'active');
        }
      }
  
      for (let i = 0; i < reveal2s.length; i++) {
        const revealtop = reveal2s[i].getBoundingClientRect().top;
  
        if (revealtop < windowheight - revealpoint) {
          this.renderer.addClass(reveal2s[i], 'active2');
        }
      }
    }
  }

  filledStars(num: number) {
    return Array(num).fill(0).map((x, i) => i + 1);
  }

  calcSale(newP: number, oldP: number){ return 100 - Math.floor(newP/oldP *100); }

  savetoCart(p: any){
    this._cartService.addtoCart(p);
    this._cartService.updateCart(this._cartService.cart.getValue() + 1);
  }
}