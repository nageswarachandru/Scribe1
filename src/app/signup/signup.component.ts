import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  myForm : FormGroup;
  message : string = "";
  userError : any;
  


  constructor(public fb : FormBuilder, public authService : AuthService) {     
    this.myForm = this.fb.group({
    firstname : ['',[Validators.required]],
    lastname : ['',[Validators.required]],
    email : ['',[Validators.required]],
    password : ['',[Validators.required , Validators.minLength(8)]],
    confirmpassword : ['',[Validators.required]]
  },{
    Validator : this.checkIfMatchingPasswords("password","confirmpassword")
  })}

  
  checkIfMatchingPasswords(passwordKey : string , confirmPasswordKey : string){
    return (group : FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmpassword = group.controls[confirmPasswordKey];

      if(password.value == confirmpassword.value){
        return;
      }else{
        confirmpassword.setErrors({
          notEqualToPassword : true
        })
      }
    }

  }
  onSubmit(signUpForm : FormGroup){
    let email : string = signUpForm.value.email;
    let password : string = signUpForm.value.password;
    let firstname : string = signUpForm.value.firstname;
    let lastname : string = signUpForm.value.lastname;
  


    this.authService.signup(email, password,firstname,lastname).then((user:any) => {

      firebase.firestore().collection("users").doc(user.uid).set({
        firstName:firstname,
        lastName:lastname,
        email:email,
        photoURL:user.photoURL,
        interests:"",
        bio:"",
        hobbies:""
      }).then(()=>{
        this.message = "You have been signed up successfully. Please login"
        signUpForm.reset()
        
      })
    }).catch((error) => {
      console.log(error);
      this.userError = error;
    })
    
  }
  ngOnInit(): void {
  }

}
