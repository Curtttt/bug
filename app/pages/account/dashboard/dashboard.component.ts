import { Component } from '@angular/core';
import { MyAccountComponent } from './my-account/my-account.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MyAccountComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
