import { Component, OnDestroy, OnInit } from '@angular/core';
import { productAPIService } from '../../services/product-api.service';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  noibat_products: any;
  hangmoi_products: any;
  banchay_products: any;
  errMessage: string = ''
  countdownSubscription!: Subscription;
  days: any =10; hours: any =20; mins: any=30; secs: any=40;
  today: any; diff: any;
  displayTime = '00:00:00:00';
  targetDay = new Date('Feb 10, 2024').getTime();

  constructor(private _service: productAPIService, private _cartService: CartService) { }
  ngOnInit(): void {
    this._service.get_products("outstanding_products").subscribe(res => this.noibat_products = res);
    this._service.get_products("newest_products").subscribe(res => this.hangmoi_products = res);
    this._service.get_products("bestseller_products").subscribe(res => this.banchay_products = res);;

    this.countdownSubscription = interval(1000).subscribe(val => {
      this.days = this.countdownTimer(val)['Days'];
      this.hours = this.countdownTimer(val)['Hours'];
      this.mins = this.countdownTimer(val)['Mins'];
      this.secs = this.countdownTimer(val)['Secs'];
    })
  }

  countdownTimer(seconds: number) {
    const totalSeconds = Math.floor((this.targetDay - Date.now()) / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const remainingSeconds = totalSeconds % 60;
    const formattedDays = days < 10 ? '0' + days : days;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return {'Days': formattedDays, 'Hours': formattedHours, 'Mins': formattedMinutes, 'Secs': formattedSeconds}
  }

  filledStars(num: number) {
    return Array(num).fill(0).map((x, i) => i + 1);
  }

  savetoCart(p: any){
    this._cartService.addtoCart(p);
    this._cartService.updateCart(this._cartService.cart.getValue() + 1);
  }

  ngOnDestroy(): void {
    this.countdownSubscription.unsubscribe();
  }
}

