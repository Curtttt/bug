import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactapiService } from '../../services/contact-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formContact: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required)
  })
constructor(private ContactServ: ContactapiService) {
  }
  onSubmit() {
    console.log(this.formContact.value)
    this.ContactServ.ContactUser(this.formContact.value).subscribe({
      next: (data: any) => {
        this.formContact = data
        alert("Gửi thành công");
        window.location.reload()
      },
      error: (err: string) => {
        this.errMessage = err;
        alert('Lỗi rồi!')
      }
    });
  }
  get f() {
    return this.formContact.controls;
  }
  errMessage: string = ''
  
}
