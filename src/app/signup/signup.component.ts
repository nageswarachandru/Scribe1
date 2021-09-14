import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  myForm : FormGroup;
  


  constructor(public fb : FormBuilder) {     
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
  onSubmit(signUpForm : any){
    console.log(signUpForm.value)
    
  }


  ngOnInit(): void {
  }

}
