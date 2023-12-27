import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { ActivatedRoute, Router} from '@angular/router';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-AdminOrderDetails',
  templateUrl: './AdminOrderDetails.component.html',
  styleUrls: ['./AdminOrderDetails.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {
  Orders: any;
  status: boolean = false;

  OrderId:any;

  constructor(private http: HttpClient, private service: MenuItemService,private router:ActivatedRoute,private route:Router) {
    this.OrderId = this.router.snapshot.paramMap.get('orderid');
    this.http.get(environment.getOrderDetails).subscribe((res: any) => {
      this.Orders = res;
      if (this.Orders == 0) {
        this.status = !this.status;
      }
    })
  }

  ngOnInit() {}
  Order_Status(OrderId:number,value:String){
    this.service.updateOrderStatus(OrderId).subscribe((res:any)=>{
      if(value === 'Accept'){
        res.Order_Status = 'Accepted';
        res.Menu_Prep_Status = 'In-Progess';
      }
      else if(value === 'Reject'){
        res.Order_Status = 'Rejected';
        res.Menu_Prep_Status = 'Rejected';
      }
      else if(value === 'Deliver'){
        res.Order_Status = 'Delivered';
      }

      let OrderData = res;

      this.http.patch(environment.getOrderDetails+`/`+OrderId,OrderData).subscribe((res)=>{
        alert('Order Status Changed');
        window.location.reload();
      });
    })
  }

  Menu_Prep_Status(OrderId:number){
    this.service.updateMenuPrepStatus(OrderId).subscribe((res:any)=>{
      res.Menu_Prep_Status = 'Prepared';

      let OrderData = res;

      this.http.patch(environment.getOrderDetails+`/`+OrderId,OrderData).subscribe((res)=>{
        alert('Menu Preparation Status Changed');
        window.location.reload();
      });
  })
}

}

