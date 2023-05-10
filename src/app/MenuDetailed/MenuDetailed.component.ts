import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItemService } from '../MenuItem.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-MenuDetailed',
  templateUrl: './MenuDetailed.component.html',
  styleUrls: ['./MenuDetailed.component.css']
})
export class MenuDetailedComponent implements OnInit {

  menuList:any;
  searchFor:any;
  finalMenu:any;
  constructor(private menuService:MenuItemService,private route:ActivatedRoute,private http:HttpClient) { }
  ngOnInit() {

    this.menuService.menuList().subscribe(data=>{
      this.menuList = data;
      this.route.params.subscribe(paramData=>{
        this.searchFor = paramData['check'];
        
        for(let menu of this.menuList){
          if(menu.menuname == this.searchFor){
            this.finalMenu = menu;
            break;
          }
        }
      })
    })
  }

}
