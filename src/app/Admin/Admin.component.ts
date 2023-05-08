import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent implements OnInit {
  adminProfile:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:3000/Admin").subscribe((data => {
      this.adminProfile = data;
    }))
  }

}
