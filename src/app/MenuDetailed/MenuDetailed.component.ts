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

  removeCart:boolean = false;

  constructor(private menus: MenuItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    let menuid = this.route.snapshot.paramMap.get('check'); // to get the id from url
    menuid && this.menus.getMenuById(menuid).subscribe((result) => {
      this.menuData = result; // to get the menu by sending id and store it in menudata
    })

     // to display remove to cart only when user is logged in and when it is in localstorage
      let cartData = localStorage.getItem('localCart');
      if( menuid && cartData && localStorage.getItem('user')){
        let items = JSON.parse(cartData);
        items = items.filter((item:any)=>menuid === item.id.toString());
        if(items.length){
          this.removeCart = true; }
        else{
          this.removeCart = false;}
      }
    }

    // quantity + or -
    menuQuantity: number = 1;
    handleQuantity(val:string){
      if(this.menuQuantity < 20 && val==='plus'){
        this.menuQuantity+=1;
      }
      else if(this.menuQuantity > 20 && val==='minus'){
        this.menuQuantity-=1;
      }
    }

    // add to cart when user is logged in
    addToCart(){
      if(this.menuData && localStorage.getItem('user')){
      this.menuData.menuquantity = this.menuQuantity;
      // to check which user is logged in and add that user email in along with menu details
      let user = localStorage.getItem('user');
      let userEmail = user && JSON.parse(user).email;
      // to store menu in cart along with user email
      this.menuData.userEmail = userEmail;
      this.menus.AddToCartLocal(this.menuData);
      this.removeCart = true; 
      // to add menu item in cart in db.json
      let cartData ={
        menuId:this.menuData.id,
        ...this.menuData
      }
      delete cartData.id;
      this.menus.addToCartDB(cartData).subscribe((result)=>{
        if(result){
          alert('Menu is added in cart');
        }
      })
      }      
      else{
      alert('please login to add menu to cart');
      }
    }

    // remove from cart when user is logged in and when menu is in cart
    removeToCart(menuid:number){
      this.menus.RemoveToCartLocal(menuid);
      this.removeCart = false;
    }
}

