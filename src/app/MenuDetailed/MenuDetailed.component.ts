import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { ActivatedRoute } from '@angular/router';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-MenuDetailed',
  templateUrl: './MenuDetailed.component.html',
  styleUrls: ['./MenuDetailed.component.css']
})
export class MenuDetailedComponent implements OnInit {

  menuData: any;

  menuQuantity: number = 1;

  removeCart = false;

  constructor(private menus: MenuItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    let menuid = this.route.snapshot.paramMap.get('check'); // to get the id from url
    menuid && this.menus.getMenuById(menuid).subscribe((result) => {
      this.menuData = result; // to get the menu by sending id and store it in menudata

      let cartData = localStorage.getItem('localCart');
      if (menuid && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: any) => menuid === item.id.toString());
        if (items.length) {
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }

    })
  }

  handleQuantity(val: string) {
    if (this.menuQuantity < 20 && val == 'plus') {
      this.menuQuantity += 1;
    }
    else if (this.menuQuantity > 1 && val == 'min') {
      this.menuQuantity -= 1;
    }
  }

  addToCart() {
    if (this.menuData) {
      this.menuData.quantity = this.menuQuantity;
      if (!localStorage.getItem('user')) {
        this.menus.localAddToCart(this.menuData);
        this.removeCart = true;
      }
    }
  }

  removeToCart(menuId:number){
    this.menus.removeItemFromCart(menuId);
    this.removeCart = false;
  }
}

