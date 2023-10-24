import { Component } from '@angular/core';
import { Product } from '../Models/product';
import { ProductsService } from '../services/products.service';
import { MessageService } from 'primeng/api';
import { CartItem } from '../Models/cartItems';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  products: Product[] = [];

  responsiveOptions: any[] | undefined;

  //Paginator:
  totalRecords!:number;
  currentPage = 0;
  rowsPerPage = 6;
  first = 0;
  productsPaginated: Product[] =[];

  constructor(private productService: ProductsService, private messageService: MessageService) {}

  ngOnInit() {

    this.productService.getAllProducts().subscribe({
      next:(prods:Product[])=>{
        this.products = prods;
        this.paginatorInit();
      }
    });




  }


  paginate(event:any){
    this.first = event.first;
    this.currentPage = event.page;
    const start = this.currentPage * this.rowsPerPage;

    this.totalRecords = this.products.length;
    this.productsPaginated = this.products.slice(start, start + this.rowsPerPage);

  }

  paginatorInit(){
    const start = this.currentPage * this.rowsPerPage;

    this.totalRecords = this.products.length;
    this.productsPaginated = this.products.slice(start, start + this.rowsPerPage);
  }

  addToCart(product:Product){
    if(localStorage.getItem('user') === null) {
      this.messageService.add({key:"addToCartFailure", severity:"error", summary:"Error", detail:`An error occured while adding to cart`});
      return;
    }else{
      const user = JSON.parse(localStorage.getItem('user')!);
      this.productService.addToCart(product.productId, user.id, 1).subscribe({
        next:(cartItem: CartItem)=>{
          this.messageService.add({key:"addToCartSuccess", severity:"success", summary:"Success", detail:`You have successfully added this item : ${cartItem.itemName} to your cart`});
          setTimeout(()=>{
            window.location.reload();
          },2000)
        },
        error:()=>{
          this.messageService.add({key:"addToCartError", severity:"error", summary:"Error", detail:`Couldn't add product to cart`});
          setTimeout(()=>{
            window.location.reload();
          },2000)
        }
      })
    }


  }
}
