import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-Checkout',
  templateUrl: './Checkout.component.html',
  styleUrls: ['./Checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalAmount:number|undefined;
  MobileNo:any;

  constructor(private menuservice:MenuItemService,private http:HttpClient) { }

  ngOnInit() {
    this.menuservice.Cart().subscribe((data)=>{

      let price = 0;
      data.forEach((item:any) => {
        if(item.menuquantity){
          price  += (+item.menuprice * +item.menuquantity);
        }
      })
      this.totalAmount = price+(price/10);
    })

    // For Reteriving User Mobile
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


  orderNow(data:any){
    let user = localStorage.getItem('user');
    let userEmail = user && JSON.parse(user).email;

    if(this.totalAmount){
      let orderDetails = {
        Email_Id: userEmail,
        Mobile_No: this.MobileNo,
        Total_Amount: this.totalAmount,
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
