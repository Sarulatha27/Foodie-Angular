import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  url: any = 'http://localhost:3000/MenuItems';

  constructor(private menu: HttpClient) {}

  AddMenu(body: any) {
    return this.menu.post(this.url, body);
  }

  menuList() {
    return this.menu.get(this.url);
  }

}
