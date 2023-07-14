import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Foodie';

  constructor(public router: Router) { }

  ngOnInit() { }

  number: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
}
