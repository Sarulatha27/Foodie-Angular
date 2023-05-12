import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private http:HttpClient,private menuservice:MenuItemService) { }

  ngOnInit() {
  }

}
