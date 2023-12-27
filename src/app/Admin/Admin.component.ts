import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent implements OnInit {
  adminProfile:any;

  constructor(private http: HttpClient,private route:Router) { }

  ngOnInit() {
    this.http.get(environment.getAdminDetails).subscribe((data => {
      this.adminProfile = data;
    }))
  }

  logout(){
    localStorage.removeItem('admin');
    this.route.navigate(['home']);
  }

}
