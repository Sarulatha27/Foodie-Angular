import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContactQueryService {

  constructor(private http: HttpClient) { }

  Contact(body: any) {
    return this.http.post(environment.getContactDetails, body);
  }
}
