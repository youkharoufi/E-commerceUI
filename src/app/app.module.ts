import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { Route, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RegisterComponent } from './register/register.component';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { PaginatorModule } from 'primeng/paginator';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';

const routes : Route[] = [
  {path:'', component: IndexComponent},
  {path:'register', component: RegisterComponent},
  {path:'product-details/:id', component: ProductDetailsComponent},
  {path:'cart/:id', component: CartComponent},
  {path:'contact', component: ContactComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    SidebarComponent,
    FooterComponent,
    IndexComponent,
    RegisterComponent,
    ProductDetailsComponent,
    CartComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule,
    CalendarModule,
    CarouselModule,
    PaginatorModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
