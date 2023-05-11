import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Footer',
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css']
})
export class FooterComponent implements OnInit {

  userName:string="";
  menuType:string='default';
  constructor(public router: Router) { }

  ngOnInit() {
        if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.email;
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
