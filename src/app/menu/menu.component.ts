import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  loggedIn : boolean;
  user : any;
  show: boolean = false;

  constructor(private router: Router) {
    this.user = firebase.auth().currentUser;

    if(this.user){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.loggedIn = true;
        this.user = user;
      }else{
        this.loggedIn = false;
        this.user = null;
      }
    })
   }

  ngOnInit(): void {
  }

  logout(){
    firebase.auth().signOut();
  }

  navprofile(){
    this.router.navigate(['profile', this.user.uid]);
  }

  toggleMenu(){
    this.show = !this.show;
  }

}
