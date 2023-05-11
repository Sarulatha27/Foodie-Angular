import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  url: any = 'http://localhost:3000/MenuItems';

  cartData = new EventEmitter<[]>();// to display dynamically number of cartItems in cart Component

  constructor(private http: HttpClient) {}

  // used in admin component to add the menu
  AddMenu(body: any) {
    return this.http.post(this.url, body);
  }

  // used in menu component to fetch the menu
  menuList() {
    return this.http.get(this.url);
  }

  // used in menu detailed component to fetch the menu by id
  getMenuById(id:String){
    return this.http.get(`http://localhost:3000/MenuItems/${id}`);
  }

  // used to add menu in cart in local storage
  localAddToCart(data:any){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
    }
    else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    } 
  }
}
