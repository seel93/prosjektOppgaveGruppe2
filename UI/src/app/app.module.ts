//Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { fromPromise } from 'rxjs/observable/fromPromise';

//Components:
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './order/order.component';

//services:
import {AuthService} from './services/auth.service';
import {OrderService} from './services/order.service';
import { UserComponent } from './user/user.component';
 

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'equipment', component : EquipmentComponent },
  {path: 'admin', component : AdminComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'order', component: OrderComponent},
  {path: 'user/:id', component: UserComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EquipmentComponent,
    NavbarComponent,
    AdminComponent,
    RegisterComponent,
    OrderComponent,
    UserComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {useHash: true},
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
