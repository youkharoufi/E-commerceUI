import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../Models/registerUser';
import { NgForm } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { MessageService } from 'primeng/api';
import { ApplicationUser } from '../Models/applicationUser';

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
    country:'',
    token:''
  };

  registerForm!: NgForm;

  verifPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{4,}$/;

  passwordConfirmation!: string;

  constructor(private accountService: AccountService, private messageService: MessageService){}

  ngOnInit(): void{
    const states = document.querySelectorAll("select#state option") as NodeListOf<HTMLOptionElement>;

    states.forEach((state:HTMLOptionElement)=>{
      state.value = state.textContent!
    })
  }

  register(){
    this.accountService.register(this.registerUser).subscribe({
      next:(user:ApplicationUser)=>{
        this.messageService.add({key:"registerSuccess", severity:"success", summary:"Success", detail:"You have registered successfully !"});
        setTimeout(()=>{
          window.location.reload()
        },2000);
      },
      error:(error: Error)=>{
        this.messageService.add({key:"RegisterFailure", severity:"error", summary:"Error", detail:`An error occured during registration (${error.message})`});
        setTimeout(()=>{
          window.location.reload()
        },2000);
      }
    })
  }

}
