import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environent } from 'src/environments/environment';
import { Product } from '../Models/product';
import { Observable } from 'rxjs';
import { CartItem } from '../Models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = environent.baseUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"products/get-all-products");
  }

  getProductDetails(productId:string): Observable<Product>{
    return this.http.get<Product>(this.baseUrl+"products/get-one-product/"+productId);
  }

  addToCart(productId:number, userId:string, quantity:number): Observable<CartItem>{
    return this.http.post<CartItem>(this.baseUrl+"products/add-to-cart/"+productId+"/"+userId+"/"+quantity, {productId, userId, quantity});
  }
}
