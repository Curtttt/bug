import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog2',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog2.component.html',
  styleUrl: '../blogDetail.css'
})

export class Blog2Component implements OnInit{
  ngOnInit(): void {
    scrollTo(0, 0);
  }
}
