import { Component, OnInit } from '@angular/core';
import { MenuItemService } from '../MenuItem.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Menu',
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.css']
})
export class MenuComponent implements OnInit {
  menuList: any;
  search: any;

  constructor(private menu: MenuItemService) { }

  ngOnInit() {
    this.menu.menuList().subscribe((data) => {
      if (data) {
        this.menuList = data;
      }
    })
  }

}
