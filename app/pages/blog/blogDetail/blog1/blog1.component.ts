import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog1',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog1.component.html',
  styleUrl: '../blogDetail.css'
})
export class Blog1Component implements OnInit{
  ngOnInit(): void {
    scrollTo(0, 0);
  }
}
