import { Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../services/location-api.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [LocationService],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnDestroy, OnInit{
  price_lst: any;
  subscription!: Subscription;
  provinces_lst: any[] = []; districts_lst: any[] = []; wards_lst: any[] = [];
  locationForm = new FormGroup({
    provinceControl: new FormControl(''),
    districtControl: new FormControl(''),
    wardControl: new FormControl('')
  });

  checkoutaForm = new FormGroup({
    fullname: new FormControl('', Validators['required']),
    email: new FormControl('', [Validators['required'], Validators.email]),
    phone: new FormControl('', [Validators['required']])
  })
  get f() {
    return this.checkoutaForm.controls;
  }
  onCheckout(){
    console.log(this.checkoutaForm.value)
  }

  constructor(private locationService: LocationService, private cartService: CartService){
    this.subscription = this.locationService.fetchData().subscribe((data: any) => {
      this.provinces_lst = data;
    });
  }

  ngOnInit(): void {
    this.cartService.currentTotal.subscribe(price => this.price_lst = price)
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  districts_fil(){
    if(this.districts_lst.length != 0){ this.wards_lst = []}
    let i = this.provinces_lst.findIndex((x: any) => x.name == this.locationForm.controls.provinceControl.value);
    this.districts_lst = this.provinces_lst[i].districts;
  }
  
  wards_fil(){
    let i = this.districts_lst.findIndex(x => x.name == this.locationForm.controls.districtControl.value);
    this.wards_lst = this.districts_lst[i].wards;
  }
}