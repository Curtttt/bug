import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AccountApiService } from '../../services/account-api.service';
import { productAPIService } from '../../services/product-api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  num!: number;
  isLoggedin = false;
  name?: string;

  constructor(private authService: SocialAuthService, private _service: AccountApiService, private _cartService: CartService) {
  }

  ngOnInit(): void {
    this._cartService.currenCart.subscribe(sl => this.num = sl);

    this._service.currentUser.subscribe(profile => {
      if (profile != null){
        this.name = profile['username'];
        this.isLoggedin = true;
      }
    });
  }

  signOut(): void {
    this.isLoggedin = false;
  }
}
