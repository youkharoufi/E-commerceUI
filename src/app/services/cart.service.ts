import { HttpClient } from '@angular/common/http';
import { environent } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Cart } from '../Models/cart';
import { Observable } from 'rxjs';
import { CartItem } from '../Models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = environent.baseUrl;

  constructor(private http : HttpClient) { }

  assignNewCartToUser(userId:string): Observable<Cart>{
    return this.http.post<Cart>(this.baseUrl+'cart/assign-new-cart-to-user/'+userId, userId);
  }

  itemsCount(userId:string, cartId:number): Observable<number>{
    return this.http.get<number>(this.baseUrl+'cart/items-count/'+userId+"/"+cartId);
  }

  getCart(userId:string): Observable<Cart>{
    return this.http.get<Cart>(this.baseUrl+'cart/'+userId);
  }

  changeProductQuantity(itemId:number, newQuantity:number): Observable<CartItem>{
    return this.http.post<CartItem>(this.baseUrl+"cart/change-quantity-of-a-product/"+itemId+"/"+newQuantity, {itemId, newQuantity});
  }

  getCartItems(cartId:number): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this.baseUrl+'cart/get-all-cart-items/'+cartId)
  }

  getCartTotal(cartId:number): Observable<number>{
    return this.http.get<number>(this.baseUrl+'cart/get-cart-total/'+cartId);
  }

  deleteCartItem(itemId: number): Observable<CartItem>{
    return this.http.delete<CartItem>(this.baseUrl+'cart/delete-cart-item/'+itemId);
  }
}
