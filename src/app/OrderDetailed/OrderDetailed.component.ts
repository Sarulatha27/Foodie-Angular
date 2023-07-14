import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-OrderDetailed',
  templateUrl: './OrderDetailed.component.html',
  styleUrls: ['./OrderDetailed.component.css']
})
export class OrderDetailedComponent implements OnInit {

  orderData:any;

  status:boolean=false;

  constructor(private orders:MenuItemService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    let orderid = this.route.snapshot.paramMap.get('check');
    orderid && this.orders.getOrdersId(orderid).subscribe((res)=>{
      console.warn(res);
      this.orderData = res;
    })
  }

  cancelOrder(id:number){
    this.orders.cancelOrder(id).subscribe((result)=>{
      alert("Are you sure to cancel the order ?")
      if(result){
        this.getOrderList();
      }
    })
  }

  getOrderList(){
    this.orders.OrderList().subscribe((result)=>{
      this.orderData = result;
      if(!result){
        this.status =! this.status;
        setTimeout(()=>this.router.navigate(['menu']),5000);
      }
      else{
        this.router.navigate(['orders']);
      }
    })
  }
}
