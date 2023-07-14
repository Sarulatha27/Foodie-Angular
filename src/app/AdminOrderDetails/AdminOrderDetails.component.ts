import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-AdminOrderDetails',
  templateUrl: './AdminOrderDetails.component.html',
  styleUrls: ['./AdminOrderDetails.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {
  Orders: any;
  status: boolean = false;

  OrderId:any;

  UpdateOrderStatus = new FormGroup({
    id: new FormControl(''),
    status: new FormControl(''),
  })
  
  constructor(private http: HttpClient, private service: MenuItemService,private router:ActivatedRoute,private route:Router) {
    this.OrderId = this.router.snapshot.paramMap.get('orderid');
    this.http.get("http://localhost:3000/Orders").subscribe((res: any) => {
      this.Orders = res;
      if (this.Orders == 0) {
        this.status = !this.status;
      }
    })
  }

  ngOnInit() { 
    this.service.getOrderDetails(this.OrderId).subscribe((result:any)=>{
      this.UpdateOrderStatus = new FormGroup({
        id: new FormControl(result['id']),
        status: new FormControl(result['status']),
      })
    })
  }

  Submit(){
    this.service.updateOrderStatus(this.OrderId,this.UpdateOrderStatus.value).subscribe((result)=>{
      alert('Order Status Updated Succesfully');
      this.UpdateOrderStatus.reset();
        this.route.navigate(['admin/orderDetails']);
    })
  }

}

