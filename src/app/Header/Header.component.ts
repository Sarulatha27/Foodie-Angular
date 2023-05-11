import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail:any;
  menuType:string='default';
  constructor(public router: Router) { 
  }

  ngOnInit() {
        if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userEmail = userData.email;
          this.menuType = 'user';
        }
        else{
          this.menuType = 'default';
        }
  }
  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    window.location.reload();
  }
}