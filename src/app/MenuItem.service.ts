import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {

  constructor(private http: HttpClient) {}

  // used in admin component to add the menu
  AddMenu(body: any) {
    return this.http.post(environment.getMenuItems, body);
  }

  // used in menu component to fetch the menu
  menuList() {
    return this.http.get(environment.getMenuItems);
  }

  // used in menu detailed component to fetch the menu by id
  getMenuById(id:String){
    return this.http.get(environment.getMenuItems+`/`+id);
  }

  // to dynamically increse number of menu in cart in header cart(5)..
  cartDataItem = new EventEmitter<[]>;

  localAddCart(data:any){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
    }
    else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartDataItem.emit(cartData);
    }
  }

  // to add menu in cart in db.json
  addToCartDB(menuData:any){
    return this.http.post(environment.getCartDetails,menuData)
  }

  // to get the cart list item number 
  getCartList(userEmail:string){
    return this.http.get<any>(environment.getCartDetails+`?userEmail=`+userEmail,{
      observe:'response'
    }).subscribe((result)=>{
      if(result && result.body){
        this.cartDataItem.emit(result.body);
      }
    })
  }

  // remove from cart
  romoveFromCart(id:number){
    return this.http.delete(environment.getCartDetails+`/`+id);
  }

  // to show cart items for a particular user
  Cart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any>(environment.getCartDetails+`?userEmail=`+userData.email);
  }

  // automatically delete the cart items when it is ordered
  deleteCartItem(id:number){
    return this.http.delete(environment.getCartDetails+`/`+id).subscribe((result)=>{
      this.cartDataItem.emit([]);
    })
  }

  // to place the order
  orderNow(data:any){
    return this.http.post(environment.getOrderDetails,data);
  }

  // My oredrs page
  OrderList(){
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      return this.http.get<any>(environment.getOrderDetails+`?Email_Id=`+userData.email);
  }

  // detailed view of orders
  getOrdersId(id:String){
    return this.http.get(environment.getOrderDetails+`/`+id);
  }

  // To Cancel the order
  cancelOrder(id:number){
    return this.http.delete(environment.getOrderDetails+`/`+id);
  }

  // Admin side to update order status
  getOrderDetails(id:any){
    return this.http.get(environment.getOrderDetails+`/`+id);
  }

  updateCartQty(id:number){
    return this.http.get(environment.getCartDetails+`/`+id);
  }

  updateOrderStatus(id:number){
    return this.http.get(environment.getOrderDetails+`/`+id);
  }

  updateMenuPrepStatus(id:number){
    return this.http.get(environment.getOrderDetails+`/`+id);
  }
}
