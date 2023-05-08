import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  customerCount: number = 0;
  foodCount: number = 0;
  menuCount: number = 0;
  fiveStarCount: number = 0;

  customerCountStop: any = setInterval(() => {
    this.customerCount++;
    if (this.customerCount == 100) {
      clearInterval(this.customerCountStop)
    }
  }, 100)

  foodCountStop: any = setInterval(() => {
    this.foodCount++;
    if (this.foodCount == 200) {
      clearInterval(this.foodCountStop)
    }
  }, 100)

  menuCountStop: any = setInterval(() => {
    this.menuCount++;
    if (this.menuCount == 75) {
      clearInterval(this.menuCountStop)
    }
  }, 100)

  fiveStarCountStop: any = setInterval(() => {
    this.fiveStarCount++;
    if (this.fiveStarCount == 180) {
      clearInterval(this.fiveStarCountStop)
    }
  }, 100)

  constructor() { }

  ngOnInit() {
  }

}
