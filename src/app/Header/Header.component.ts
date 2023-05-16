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

  // variable to display number of menu present in cart in header
  cartItems=0;

  constructor(public router: Router, private menu: MenuItemService) {
    // to display menu item length in header
    this.menu.cartDataItem.subscribe((items:any)=>{
      this.cartItems = items.length;
    })
  }

  ngOnInit() {

    // to change nav bar in header
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.userEmail = userData.email;
      this.menuType = 'user';
      this.menu.getCartList(this.userEmail);
    }
    else {
      this.menuType = 'default';
    }
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['home']);
    window.location.reload();
  }
  
}