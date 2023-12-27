import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Menu',
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.css']
})
export class MenuComponent implements OnInit {
  menuList: any;

  filterCategory:any;

  menuid:any;

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

  constructor(private menuservice: MenuItemService,private router:Router) { }

  ngOnInit() {
    this.menuservice.menuList().subscribe((data) => {
      if (data) {
        this.menuList = data;
        this.filterCategory = data;

        this.menuList.forEach((menu:any) => {
          this.calculateOfferPrice(menu);
        });
        this.scheduleToOriginalPrice();
      }      
    })
  }
  
  filter(category:any){
    this.filterCategory = this.menuList.filter((a:any)=>{
      if(a.menucategory == category || category == ''){
        return a;
      }
    });
  }

  calculateOfferPrice(menu:any){
    if(menu.menucategory === 'Soup'){
    menu.offerPrice = menu.menuprice*0.9;
    }
  }

  scheduleToOriginalPrice(){
    setTimeout(()=>{
      this.menuList.forEach((menu:any)=>{
        menu.offerPrice= undefined;
      })
    },100000);
  }

  // add to cart when user is logged in
  addToCart(menu:any) {
    // to check which user is logged in and add that user email in along with menu details
    let user = localStorage.getItem('user');
    let userEmail = user && JSON.parse(user).email;
    if (menu && localStorage.getItem('user')) {
      menu.menuquantity = 1;
      // to store menu in cart along with user email
      menu.userEmail = userEmail;

      // to add menu item in cart in db.json
      let cartData = {
        menuId: menu.id,
        ...menu
      }

      delete cartData.id;
      this.menuservice.addToCartDB(cartData).subscribe((result) => {
        if (result) {
          alert('Menu is added in cart');
          this.router.navigate(['/menu']);
          this.menuservice.getCartList(userEmail);
        }
      })
    }
    else {
      alert('please login to add menu to cart');
      menu.menuquantity = 1;
      this.menuservice.localAddCart(menu);
      this.router.navigate(['/login']);
    }
  } 
}


