import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemService } from '../MenuItem.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail: any;
  menuType: string = 'default';
  cartItems = 0;
  constructor(public router: Router, private menu: MenuItemService) {
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.userEmail = userData.email;
      this.menuType = 'user';
    }
    else {
      this.menuType = 'default';
    }

    // for cart
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.menu.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    window.location.reload();
  }
}