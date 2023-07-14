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

  // to show cart items for a particular user
  Cart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any>(`http://localhost:3000/Cart?userEmail=`+userData.email);
  }

  // automatically delete the cart items when it is ordered
  deleteCartItem(id:number){
    return this.http.delete(`http://localhost:3000/Cart/`+id).subscribe((result)=>{
      this.cartDataItem.emit([]);
    })
  }

  // to place the order
  orderNow(data:any){
    return this.http.post('http://localhost:3000/Orders',data);
  }

  // My oredrs page
  OrderList(){
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      return this.http.get<any>(`http://localhost:3000/Orders?Email_Id=`+userData.email);
  }

  // detailed view of orders
  getOrdersId(id:String){
    return this.http.get(`http://localhost:3000/Orders/${id}`);
  }

  // To Cancel the order
  cancelOrder(id:number){
    return this.http.delete(`http://localhost:3000/Orders/`+id)
  }


  // Admin side to update order status
  getOrderDetails(id:any){
    return this.http.get(`http://localhost:3000/Orders/`+id);
  }

  updateOrderStatus(id:number,data:any){
    return this.http.patch(`http://localhost:3000/Orders/`+id,data);
  }

  updateCartQty(id:number){
    return this.http.get('http://localhost:3000/Cart/'+id);
  }
}
