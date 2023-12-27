import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-AdminProfile',
  templateUrl: './AdminProfile.component.html',
  styleUrls: ['./AdminProfile.component.css']
})
export class AdminProfileComponent implements OnInit {

  adminProfile:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(environment.getAdminDetails).subscribe((data => {
      this.adminProfile = data;
    }))
  }
}
