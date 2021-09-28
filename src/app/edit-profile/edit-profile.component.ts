import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  message : string = "";
  user:any = {};

  constructor() {
    this.getProfile();
   }

  ngOnInit(): void {
  }

  getProfile(){
    let userId = firebase.auth().currentUser.uid;
    console.log(userId);
    firebase.firestore().collection("users").doc(userId).get().then((documentSnapshot)=>{

      this.user = documentSnapshot.data();
      console.log(documentSnapshot.data());
      this.user.displayName = this.user.firstName + " " + this.user.lastName;
      this.user.id = documentSnapshot.id;
    }).catch((error)=>{
      console.log(error);

    })
  }

  update(){

    firebase.auth().currentUser.updateProfile({
      displayName:this.user.displayName,photoURL:this.user.photoURL
    }).then(()=>{
      let userId=firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(userId).update({
        firstName:this.user.displayName.split(' ')[0],
        lastName:this.user.displayName.split(' ')[1],
        hobbies:this.user.hobbies,
        interests:this.user.interests,
        bio:this.user.bio
      }).then(()=>{
        this.message="Profile Updated Successfully.";
      }).catch((error)=>{
        console.log(error);
      })
    }).catch((error)=>{
      console.log(error);
    })

  }

}
