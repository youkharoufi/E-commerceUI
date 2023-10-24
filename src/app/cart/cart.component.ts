import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ApplicationUser } from '../Models/applicationUser';
import { Cart } from '../Models/cart';
import { CartItem } from '../Models/cartItems';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  user!:ApplicationUser;
  cart!: Cart;
  cartItems!:CartItem[];
  total=0;
  productCount=0;

  constructor(private cartService: CartService){}

  ngOnInit(): void{

    if(localStorage.getItem('user') !== null){
      this.user = JSON.parse(localStorage.getItem('user')!);

      this.cartService.getCart(this.user.id).subscribe({
        next:(cart:Cart)=>{
          this.cart = cart;
          this.cartService.getCartItems(cart.cartId).subscribe({
            next:(cartItems:CartItem[])=>{
              this.cartItems = cartItems
            }
          });
          this.cartService.getCartTotal(cart.cartId).subscribe({
            next:(total:number)=>{
              this.total = total;
            }
          });

          this.cartService.itemsCount(this.user.id, cart.cartId).subscribe({
            next:(productCount:number)=>{
              this.productCount = productCount;
            }
          });

        }
      })


    }
  }
}
