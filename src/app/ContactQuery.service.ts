import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactQueryService {

  url: any = "http://localhost:3000/ContactQueries";
  constructor(private http: HttpClient) { }

  Contact(body: any) {
    return this.http.post(this.url, body);
  }
}
