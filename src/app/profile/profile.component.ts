import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';
import 'firebase/firestore';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : any = {};
  posts : any[] = [];
  

  constructor(public activatedroute : ActivatedRoute) { 

    let id = this.activatedroute.snapshot.paramMap.get('id');
    console.log(id)

    this.getProfile(id)
    this.getUsersPosts(id)
  }

  ngOnInit(): void {
  }

  getProfile(id : string){

    firebase.firestore().collection("users").doc(id).get().then((documentSnapshot)=>{

      this.user = documentSnapshot.data();
      console.log(documentSnapshot.data());
      this.user.displayName = this.user.firstName + " " + this.user.lastName;
      this.user.id = documentSnapshot.id;
      this.user.hobbies = this.user.hobbies.split(",");
      console.log(this.user);
    }).catch((error)=>{
      console.log(error);

    })
  }

  getUsersPosts(id:string){

    firebase.firestore().collection("posts").where("owner","==",id).get().then((data)=>{
      this.posts=data.docs; 
    })
  }

}
