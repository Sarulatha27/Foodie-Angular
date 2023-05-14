import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})
export class CartComponent implements OnInit {

  cartItemData:any;

  orderSummary:any={
    price:0,
    gst:0,
    total:0
  };

  MobileNo:any;

  checkoutStatus:boolean = false;
  
  constructor(private menuservice:MenuItemService,private router:Router,private http:HttpClient) { }

  ngOnInit() {
    this.menuservice.Cart().subscribe((data)=>{
      this.cartItemData = data;

      let price = 0;
      data.forEach((item:any) => {
        if(item.menuquantity){
          price  += (+item.menuprice * +item.menuquantity);
        }
      })
      this.orderSummary.price = price;
      this.orderSummary.gst = price/10;
      this.orderSummary.total = price+(price/10);
    })

    this.http.get("http://localhost:3000/RegisteredUsers").subscribe((users:any) => {
      users.forEach((item:any)=>{
      let user = localStorage.getItem('user');
      let userEmail = user && JSON.parse(user).email;
      if(item.email === userEmail){
       this.MobileNo=  item.mobile;
      }
     })
     });  
  }

  toggleCase(){
    this.checkoutStatus =! this.checkoutStatus;
  }

  orderNow(data:any){
    let user = localStorage.getItem('user');
    let userEmail = user && JSON.parse(user).email;

    if(this.orderSummary.total){
      let orderDetails = {
        Email_Id: userEmail,
        Mobile_No: this.MobileNo,
        Total_Amount: this.orderSummary.total,
        ...data,
      }
      this.menuservice.orderNow(orderDetails).subscribe((res)=>{
        if(res){
          alert('Your order is placed');
        }
      })
    }
  }
}
