import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Menu',
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.css']
})
export class MenuComponent implements OnInit {
  menuList: any;

  filterCategory:any;

  constructor(private menu: MenuItemService,private router:Router) { }

  ngOnInit() {
    this.menu.menuList().subscribe((data) => {
      if (data) {
        this.menuList = data;
        this.filterCategory = data;
      }
    })
  }

  filter(category:any){
    this.filterCategory = this.menuList.filter((a:any)=>{
      if(a.menucategory == category || category == ''){
        return a;
      }
    });
  }
}
