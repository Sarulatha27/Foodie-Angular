import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {
  url: any = 'http://localhost:3000/RegisteredUsers';

  constructor(private store: HttpClient) { }

  addUser(body: any) {
    return this.store.post(this.url, body);
  }

  retriveUser() {
    return this.store.get(this.url);
  }

}