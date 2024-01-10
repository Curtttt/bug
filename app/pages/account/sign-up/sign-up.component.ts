import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerAPIService } from '../../../services/customer-api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private SignupServ: CustomerAPIService) { }
  formSignup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email, Validators.minLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    fullname: new FormControl('', [Validators.required])
  })
  
  onSignup() {
    console.log(this.formSignup.value)
    this.SignupServ.signupUser(this.formSignup.value).subscribe({
      next: (data: any) => {
        this.formSignup = data
        alert("Đăng ký thành công");
        window.location.reload()
      },
      error: (err: string) => {
        this.errMessage = err;
        alert('Lỗi rồi!')
      }
    });
    
  }
  get f() {
    return this.formSignup.controls;
  }

  visible: boolean = true;
  changetype: boolean = true;
  viewpassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  errMessage: string = ''
}