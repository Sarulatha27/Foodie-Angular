import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Orders',
  templateUrl: './Orders.component.html',
  styleUrls: ['./Orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderDetails:any;

  status:boolean=false;

  constructor(private menuservice:MenuItemService,private router: Router) { }

  ngOnInit() {
    this.getOrderList();
  }

  getOrderList(){
    this.menuservice.OrderList().subscribe((result)=>{
      this.orderDetails = result;
      if(result == 0){
        this.status =! this.status;
        setTimeout(()=>this.router.navigate(['menu']),5000);
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
