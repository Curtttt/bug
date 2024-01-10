import { Component } from '@angular/core';
import { SocialAuthService, SocialLoginModule, GoogleLoginProvider, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountApiService } from '../../../services/account-api.service';
import { Customer } from '../../../interface/customer';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, SocialLoginModule, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent{
  formLogin: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  customer = new Customer();
  errMessage: any;
  constructor(private _service:AccountApiService, private router: Router){}
  onLogin(){
    
  }
  get f(){
    return this.formLogin.controls;
  }
  visible: boolean = true;
  changetype:boolean = true;
  viewpassword(){
    this.visible = !this.visible;
    this.changetype = !this.changetype
  }
  
  findCustomer(email: string, password: string){
    this._service.findCustomer(email).subscribe({
      next: (data) => {
        this.customer = data[0];
        if (this.customer != null) {
          if (this.customer.password == password){
            this._service.updateStatus(this.formLogin.value);
            this.router.navigate(['home']);
          }else{
            alert('Sai mật khẩu!');
          }
        }else{
          alert('Sai rồi!')
          stop
        }
      },
      error: (err) => { 
        this.errMessage = err;
        alert('Error!')
      }
    })
  }
  // user?: SocialUser;
  // constructor(private authService: SocialAuthService, private router: Router, private userService: UserService) {}

  // ngOnInit() {
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     console.log(user.firstName);
  //   });
  // }

  // async signInWithFB() {
  //   await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  //   await this.router.navigate(['home']), 2000;
  // }

  // signOut(){
  //   this.authService.signOut();
  // }
}
