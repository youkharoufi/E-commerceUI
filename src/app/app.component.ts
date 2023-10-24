import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { Cart } from './Models/cart';
import { ApplicationUser } from './Models/applicationUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isIndexRoute = false
  productCount = '0';
  user!:ApplicationUser;

  constructor(private router: Router, private cartService: CartService, private messageService: MessageService){
    this.router.events.subscribe({
      next:(event:any)=>{
        if(event instanceof NavigationEnd){
          this.isIndexRoute = event.urlAfterRedirects === '/';
        }
      }
    })
  }

  ngOnInit(): void{

    if(localStorage.getItem('user') !== null){
       this.user = JSON.parse(localStorage.getItem('user')!);

      this.cartService.assignNewCartToUser(this.user.id).subscribe({
        next:(cart:Cart)=>{
          this.cartService.itemsCount(this.user.id, cart.cartId).subscribe({
            next:(count:number)=>{
              this.productCount = count.toString();
            }
          })
        }
    })
  }
}
}
