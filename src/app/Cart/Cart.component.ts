import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

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

  time:any;
  

  constructor(private menuservice:MenuItemService) { }

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

      console.warn(this.time);

    })
  }

}
