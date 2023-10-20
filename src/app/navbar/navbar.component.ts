import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginUser } from '../Models/loginUser';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ApplicationUser } from '../Models/applicationUser';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showLoginModal = false;
  loginForm!:FormGroup;

  loginUser: LoginUser = {
    emailOrUserName:'',
    password:''
  };

  menuDisplay = false;

  constructor(private router: Router, private accountService: AccountService, private messageService: MessageService){

  }

  ngOnInit(): void{
    if(localStorage.getItem('user') !== null) this.menuDisplay = true;
  }

  displayLoginModal(){
    this.showLoginModal = true;
  }

  logout(){
    localStorage.removeItem('user');
    window.location.reload();
  }

  login(){
    this.accountService.login(this.loginUser).subscribe({
      next:(appUser: ApplicationUser)=>{
        this.messageService.add({key:"loginSuccess", severity: 'success', summary: 'Success', detail: 'You have been logged in successfully' });
        setTimeout(()=>{
          window.location.reload()
        },4000);
      },
      error:()=>{
        this.messageService.add({key:"loginFailure", severity: 'error', summary: 'Error', detail: 'Invalid credentials could not login' });
        setTimeout(()=>{
          window.location.reload()
        },4000)
      }
    })
  }


}
