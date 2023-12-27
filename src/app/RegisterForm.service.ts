import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {

  constructor(private store: HttpClient) { }

  addUser(body: any) {
    return this.store.post(environment.getRegisteredUsers, body);
  }

  retriveUser() {
    return this.store.get(environment.getRegisteredUsers);
  }

}