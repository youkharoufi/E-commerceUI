import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../Models/product';
import { CartItem } from '../Models/cartItems';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product!: Product;

  allProducts: Product[] = [];

  quantity = 1;

  //Paginator:
  totalRecords!:number;
  currentPage = 0;
  rowsPerPage = 6;
  first = 0;
  productsPaginated: Product[] =[];

  constructor(private route: ActivatedRoute, private productsService: ProductsService,
    private messageService : MessageService){}


  ngOnInit(): void{
    this.route.paramMap.subscribe({
      next:(params:any)=>{
        const id = params.get('id');

        this.productsService.getProductDetails(id).subscribe({
          next:(prod:Product)=>{
            this.product = prod;
          }
        })
      }
    });

    this.productsService.getAllProducts().subscribe({
      next:(prods:Product[])=>{
        this.allProducts = prods;
        this.paginatorInit();
      }
    })
  }

  paginate(event:any){
    this.first = event.first;
    this.currentPage = event.page;
    const start = this.currentPage * this.rowsPerPage;

    this.totalRecords = this.allProducts.length;
    this.productsPaginated = this.allProducts.slice(start, start + this.rowsPerPage);

  }

  paginatorInit(){
    const start = this.currentPage * this.rowsPerPage;

    this.totalRecords = this.allProducts.length;
    this.productsPaginated = this.allProducts.slice(start, start + this.rowsPerPage);
  }

  addToCart(product: Product){
    if(localStorage.getItem('user') === null){
      this.messageService.add({key:"addToCartFail", severity:'error', summary:'Error', detail:"You need to sign in before filling your cart"});

    }else{
      const user = JSON.parse(localStorage.getItem('user')!);
      this.productsService.addToCart(product.productId, user.id, this.quantity).subscribe({
        next:(cartItem: CartItem)=>{
          this.messageService.add({key:"addToCartSuccess", severity:'success', summary:'Success', detail:"You have added this item to your cart"});
          setTimeout(()=>{
            window.location.reload();
          },2000);
        },
        error:()=>{
          this.messageService.add({key:"addToCartError", severity:'error', summary:'Error', detail:"An error occured while adding to cart"});
          setTimeout(()=>{
            window.location.reload();
          },2000);
        }
      });
    }
  }
}
