import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { NotificationService } from '../services/notification.service';
import {AuthService} from './../services/auth.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public orderIdForUser: any[];
  public orderRecords: any[];
  httpOptions = { // http-headers for API
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private authService: AuthService, private notificationService: NotificationService, private httpClient: HttpClient) { }

  ngOnInit() {
    if(this.authService.getId()){
      this.fetchOrderIds();
      
    }
  }

  fetchOrderIds(){
    let iDUrl = environment.ApiUrl + "/orderbyuser";
    let payload = {id : this.authService.getId()};
    this.httpClient.post(iDUrl, payload, this.httpOptions)
     .subscribe(
        (data: any []) => {
          this.orderIdForUser = data;
          console.log(this.orderIdForUser);
        },
        (error) =>{
          this.notificationService.alertApiError(error);
        },
        () => {
          this.fetchOrders();
        }
    );
  }

  fetchOrders(){
    this.orderIdForUser.forEach(element => {
      let orderUrl = environment.ApiUrl + '/order' + '/' + element;
      this.httpClient.get(orderUrl, this.httpOptions)
        .subscribe(
          (data: any) => {
            console.log(data);
            this.orderRecords.push(data[0]);
          },
          (error) =>{
            this.notificationService.alertApiError(error);
          }, 
          () => {
            console.log(this.orderRecords);
          }
        )
    });
  }

}
