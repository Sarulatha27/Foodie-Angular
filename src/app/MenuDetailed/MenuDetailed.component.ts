import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItemService } from '../MenuItem.service';

@Component({
  selector: 'app-MenuDetailed',
  templateUrl: './MenuDetailed.component.html',
  styleUrls: ['./MenuDetailed.component.css']
})
export class MenuDetailedComponent implements OnInit {

  menuList:any ="";
  searchFor:any ="";
  finalMenu:any ="";
  constructor(private menuService:MenuItemService,private route:ActivatedRoute) { }
  ngOnInit() {
    this.menuService.menuList().subscribe(data=>{
      this.menuList = data;

      this.route.params.subscribe(paramData=>{
        this.searchFor = paramData['check'];
        
        for(let menu of this.menuList){
          if(menu.id == this.searchFor){
            this.finalMenu = menu;
            break;
          }
        }
      })
    })
  }

}
