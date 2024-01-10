import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog3',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog3.component.html',
  styleUrl: '../blogDetail.css'
})

export class Blog3Component implements OnInit{
  ngOnInit(): void {
    scrollTo(0, 0);
  }
}
