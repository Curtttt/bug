import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit {
  orderData = [
    { "id": "#9738", "date": "26/12/2023", "total": "1.200.000 (3 sản phẩm)", "status": "Đang chuẩn bị" },
            { "id": "#8703", "date": "20/12/2023", "total": "645.000 (2 sản phẩm)", "status": "Đang vận chuyển" },
            { "id": "#8225", "date": "08/12/2023", "total": "1.800.000 (4 sản phẩm)", "status": "Đã giao hàng" },
            { "id": "#8035", "date": "25/11/2023", "total": "360.000 (1 sản phẩm)", "status": "Đã giao hàng" },
            { "id": "#7824", "date": "26/11/2023", "total": "1.200.000 (3 sản phẩm)", "status": "Đã giao hàng" },
            { "id": "#6668", "date": "26/08/2023", "total": "1.200.000 (3 sản phẩm)", "status": "Đã giao hàng" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  openOrderDetail(): void { 
  }
}