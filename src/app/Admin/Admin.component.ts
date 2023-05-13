import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent implements OnInit {
  adminProfile:any;

  constructor(private http: HttpClient,private route:Router) { }

  ngOnInit() {
    this.http.get("http://localhost:3000/Admin").subscribe((data => {
      this.adminProfile = data;
    }))
  }

  logout(){
    localStorage.removeItem('admin');
    this.route.navigate(['home']);
  }

}
