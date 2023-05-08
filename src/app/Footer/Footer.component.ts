import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Footer',
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
