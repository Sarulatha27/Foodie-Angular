import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-AdminProfile',
  templateUrl: './AdminProfile.component.html',
  styleUrls: ['./AdminProfile.component.css']
})
export class AdminProfileComponent implements OnInit {

  adminProfile:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:3000/Admin").subscribe((data => {
      this.adminProfile = data;
    }))
  }
}
