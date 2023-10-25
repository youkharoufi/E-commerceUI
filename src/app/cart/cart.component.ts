import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ApplicationUser } from '../Models/applicationUser';
import { Cart } from '../Models/cart';
import { CartItem } from '../Models/cartItems';
import { ProductsService } from '../services/products.service';
import { MessageService } from 'primeng/api';

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



  constructor(private cartService: CartService, private messageService : MessageService){}

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

  updateTotalPrice(){
    this.total = this.cartItems.reduce((acc, item)=> acc + (item.itemQuantity * item.itemPrice), 0);
  }

  updateCartItem(updatedItem:CartItem){
    const index = this.cartItems.findIndex(item => item.itemId === updatedItem.itemId);

    if(index!== -1){
      updatedItem.itemTotal = updatedItem.itemQuantity * updatedItem.itemPrice;
      this.cartItems = [
        ...this.cartItems.slice(0, index),
        updatedItem,
        ...this.cartItems.slice(index+1)
      ]
    }
    this.updateTotalPrice();
  }

  incrementQuantity(cartItem:CartItem){
    if(cartItem.itemQuantity > 1){
      const updatedItem = {
        ...cartItem,
        itemQuantity:cartItem.itemQuantity + 1
      };
      this.updateCartItem(updatedItem);
    }else{
      return;
    }

  }

  decrementQuantity(cartItem:CartItem){
    if(cartItem.itemQuantity > 1){
      const updatedItem = {
        ...cartItem,
        itemQuantity:cartItem.itemQuantity - 1
      };
      this.updateCartItem(updatedItem);
    }else{
      return;
    }
  }

  onQuantityChange(event:any, cartItem:CartItem){
    const newValue = Number(event.target.value);
    const updatedItem = {...cartItem, itemQuantity: newValue};
    this.updateCartItem(updatedItem);
  }

  deleteItem(cartItem:CartItem){
    this.cartService.deleteCartItem(cartItem.itemId).subscribe({
      next:(cartItem: CartItem)=>{
        this.messageService.add({key:'deletionSuccess', severity:"success", summary:'Success', detail:"You have deleted this item from your cart"});
        setTimeout(()=>{
          window.location.reload();
        },2000)
      },
      error:()=>{
        this.messageService.add({key:'deletionError', severity:"error", summary:'Error', detail:"An error occured during item deletion"})
        setTimeout(()=>{
          window.location.reload();
        },2000)
      }
    })
  }

  validateValue(item:CartItem){
    if(item.itemQuantity < 1) item.itemQuantity = 1;
  }
}
