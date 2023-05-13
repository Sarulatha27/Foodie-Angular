import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  url: any = 'http://localhost:3000/MenuItems';

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

  // to dynamically increse number of menu in cart in header cart(5)..
  cartDataItem = new EventEmitter<[]>;

 // Add to cart
  AddToCartLocal(data:[]){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    // to add menu in local storage when it is not have anything
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartDataItem.emit(data);
    }
    // to add menu in local storage along with the previsouly added menu when localcart already have menu
    else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartDataItem.emit(cartData);
    }
  }

  // to add menu in cart in db.json
  addToCartDB(menuData:any){
    return this.http.post('http://localhost:3000/Cart',menuData)
  }

  // to get the cart list item number 
  getCartList(userEmail:string){
    return this.http.get<any>(`http://localhost:3000/Cart?userEmail=`+userEmail,{
      observe:'response'
    }).subscribe((result)=>{
      if(result && result.body){
        this.cartDataItem.emit(result.body);
      }
    })
  }

  // remove from cart
  romoveFromCart(id:number){
    return this.http.delete(`http://localhost:3000/Cart/`+id);
  }
}
