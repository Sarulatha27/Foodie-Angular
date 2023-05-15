import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-MenuDetailed',
  templateUrl: './MenuDetailed.component.html',
  styleUrls: ['./MenuDetailed.component.css']
})
export class MenuDetailedComponent implements OnInit {

  menuData: any;

  removeCart: boolean = false;

  CartData2: any | undefined; // to remove from cart

  constructor(private menus: MenuItemService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    let menuid = this.route.snapshot.paramMap.get('check'); // to get the id from url
    menuid && this.menus.getMenuById(menuid).subscribe((result) => {
      this.menuData = result; // to get the menu by sending id and store it in menudata

      // to display remove to cart only when user is logged in and when it is in localstorage
      let cartData = localStorage.getItem('localCart');
      if (menuid && cartData && localStorage.getItem('user')) {
        let items = JSON.parse(cartData);
        items = items.filter((item: any) => menuid === item.id.toString());
        if (items.length) {
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user');
      if (user) {
        let userEmail = user && JSON.parse(user).email;
        this.menus.getCartList(userEmail);
        this.menus.cartDataItem.subscribe((result) => {
          let item = result.filter((item: any) =>
            menuid?.toString() === item.menuId.toString());
          if (item.length) {
            this.CartData2 = item[0];  //to remove cart
            this.removeCart = true;
          }
        })
      }
    })
  }

  // quantity + or -
  menuQuantity: number = 1;
  handleQuantity(val: string) {
    if (this.menuQuantity <=10 && val === 'plus') {
      this.menuQuantity += 1;
    }
    else if (this.menuQuantity >=10 && val === 'minus') {
      this.menuQuantity -= 1;
    }
  }

  // add to cart when user is logged in
  addToCart() {
    // to check which user is logged in and add that user email in along with menu details
    let user = localStorage.getItem('user');
    let userEmail = user && JSON.parse(user).email;
    if (this.menuData && localStorage.getItem('user')) {
      this.menuData.menuquantity = this.menuQuantity;
      // to store menu in cart along with user email
      this.menuData.userEmail = userEmail;

      // to add menu item in cart in db.json
      let cartData = {
        menuId: this.menuData.id,
        ...this.menuData
      }
      delete cartData.id;
      this.menus.addToCartDB(cartData).subscribe((result) => {
        if (result) {
          alert('Menu is added in cart');
          this.router.navigate(['/menu']);
          this.menus.getCartList(userEmail);
          localStorage.removeItem('localCart');
          this.removeCart = true;
        }
      })
    }
    else {
      alert('please login to add menu to cart');
    }
  }

  removeFromCart(menuid: number) {
    if (localStorage.getItem('user')) {
      this.CartData2 && this.menus.romoveFromCart(this.CartData2.id)
        .subscribe((result) => {
          let user = localStorage.getItem('user');
          let userEmail = user && JSON.parse(user).email;
          this.menus.getCartList(userEmail);
          this.removeCart = false;
        })
    }
  }

}

