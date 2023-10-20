import { ApplicationUser } from './../Models/applicationUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environent } from 'src/environments/environment';
import { LoginUser } from '../Models/loginUser';
import { Observable, map } from 'rxjs';
import { RegisterUser } from '../Models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environent.baseUrl;

  constructor(private http: HttpClient) { }


  login(loginUser: LoginUser): Observable<ApplicationUser>{
    return this.http.post<ApplicationUser>(this.baseUrl+"account/login", loginUser).pipe(
      map((userFromDb: ApplicationUser)=>{
        localStorage.setItem('user', JSON.stringify(userFromDb));
        return userFromDb;
      })
    )
  };


  register(registerUser: RegisterUser): Observable<ApplicationUser>{
    return this.http.post<ApplicationUser>(this.baseUrl+"account/register", registerUser);
  }
}
