import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';

@Component({
  selector: 'app-Menu',
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.css']
})
export class MenuComponent implements OnInit {
  menuList: any;
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
