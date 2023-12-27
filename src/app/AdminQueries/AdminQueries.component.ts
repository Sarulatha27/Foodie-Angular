import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-AdminQueries',
  templateUrl: './AdminQueries.component.html',
  styleUrls: ['./AdminQueries.component.css']
})
export class AdminQueriesComponent implements OnInit {

  queries: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(environment.getContactDetails).subscribe((data => {
      this.queries = data;
    }))
  }

}
