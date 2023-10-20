import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isIndexRoute = false


  constructor(private router: Router){
    this.router.events.subscribe({
      next:(event:any)=>{
        if(event instanceof NavigationEnd){
          this.isIndexRoute = event.urlAfterRedirects === '/';
        }
      }
    })
  }
}
