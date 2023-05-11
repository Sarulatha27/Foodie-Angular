import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Menu',
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.css']
})
export class MenuComponent implements OnInit {
  menuList: any;
  search: any;
  category: any = [
    {
      menucategory: 'All'
    }, {
      menucategory: 'Soup'
    }, {
      menucategory: 'Momo'
    }, {
      menucategory: 'French Fries'
    }, {
      menucategory: 'Pizza'
    }, {
      menucategory: 'Burger'
    }, {
      menucategory: 'Sandwich'
    }, {
      menucategory: 'Ice Cream'
    }];

  constructor(private menu: MenuItemService) { }

  ngOnInit() {
    this.menu.menuList().subscribe((data) => {
      if (data) {
        this.menuList = data;
      }
    })
  }

}

/*

menuQuantity: number = 1;
handleQuantity(val: string) {
    if (this.menuQuantity < 20 && val=='plus'){
      this.menuQuantity += 1;
    }
    else if (this.menuQuantity > 1 && val=='min'){
      this.menuQuantity -= 1;
    }
  }

  addToCart() {

  } */