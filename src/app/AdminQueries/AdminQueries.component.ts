import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-AdminQueries',
  templateUrl: './AdminQueries.component.html',
  styleUrls: ['./AdminQueries.component.css']
})
export class AdminQueriesComponent implements OnInit {

  queries: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:3000/ContactQueries").subscribe((data => {
      this.queries = data;
    }))
  }

}
