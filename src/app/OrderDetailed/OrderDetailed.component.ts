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

  constructor(private orders:MenuItemService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    let orderid = this.route.snapshot.paramMap.get('check');
    orderid && this.orders.getOrdersId(orderid).subscribe((res)=>{
      console.warn(res);
      this.orderData = res;
    })
  }

}
