import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

login(email : string, password : string){
  return firebase.auth().signInWithEmailAndPassword(email, password)

}

signup(email : string, password : string, firstname : string, lastname : string){

  return new Promise((resolve,reject)=>{

    firebase.auth().createUserWithEmailAndPassword(email,password).then((response)=>{

      let randomnumber=(Math.random()*1000)

      response.user.updateProfile({
        displayName:firstname+" "+lastname,
        photoURL:"https://jdenticon.com/#icon-"+randomnumber
      }).then(()=>{
        resolve(response.user);
      }).catch((error)=>{
        reject(error);
      })
    }).catch((error)=>{
      reject(error);
    })

  })



  }
}






