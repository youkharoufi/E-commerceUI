import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../Models/registerUser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerUser: RegisterUser= {
    email:'',
    userName:'',
    firstname:'',
    lastname:'',
    addressLineOne:'',
    addressLineTwo:'',
    city:'',
    state:'',
    zipPostalCode:'',
    dateOfBirth:undefined,
    homePhone:'',
    mobilePhone:'',
    title:'',
    password:'',
    country:''
  };

  registerForm!: NgForm;

  verifPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{4,}$/;

  passwordConfirmation!: string;

  ngOnInit(): void{
    const states = document.querySelectorAll("select#state option") as NodeListOf<HTMLOptionElement>;

    states.forEach((state:HTMLOptionElement)=>{
      state.value = state.textContent!
    })
  }

}
