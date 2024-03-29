import { CartItem } from "./cartItems";

export interface Cart
{
  cartId:number;
  userId:string;
  productId:number;
  totalPrice:number;

  cartItems?:CartItem[]
}
