import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';

@Component({
  selector: 'app-Orders',
  templateUrl: './Orders.component.html',
  styleUrls: ['./Orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderDetails:any;

  status:boolean=false;

  constructor(private menuservice:MenuItemService) { }

  ngOnInit() {
    this.getOrderList();
  }

  getOrderList(){
    this.menuservice.OrderList().subscribe((result)=>{
      this.orderDetails = result;
      if(result == 0){
        this.status =! this.status;
      }
    })
  }

  cancelOrder(id:number){
    this.menuservice.cancelOrder(id).subscribe((result)=>{
      alert("Are you sure to cancel the order ?")
      if(result){
        this.getOrderList();
      }
    })
  }
}
