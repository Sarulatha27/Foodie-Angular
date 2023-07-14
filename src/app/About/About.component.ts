import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-About',
  templateUrl: './About.component.html',
  styleUrls: ['./About.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isScrollActive = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrollActive = window.pageYOffset > 100;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

}
