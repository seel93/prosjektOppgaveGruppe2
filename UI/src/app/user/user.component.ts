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
export class UserComponent implements OnInit {må 
  public orderIdForUser: any[];
  public orderRecords: any[] = Array();
  public equipmentRecordForOrder : any[] = Array();
  public date = new Date();

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
      this.notificationService.notifyOrderRecordsRecieved(this.orderRecords.length);
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
          (data: any[]) => {
            this.orderRecords.push(data[0]);
          },
          (error) =>{
            this.notificationService.alertApiError(error);
          }, 
          () => {
          }
        )
    });
  }

  modalTrigger(index){
    let selectedOrderRecord: any[] = Array();
    let orderEquipmentUrl = environment.ApiUrl + "/orderbyuser" + "/" + this.orderRecords[index]['order_id'];
    this.httpClient.get(orderEquipmentUrl, this.httpOptions)
      .subscribe(
        (data: any[])=>{
          selectedOrderRecord = data;
        },
        () => {
          this.fetchEquipmentInfoForSelectedOrderId(selectedOrderRecord);
        }
    );
    
  }

  fetchEquipmentInfoForSelectedOrderId(orderRecord){
    orderRecord.forEach(element => {
      let equipmentInfoUrl = environment.ApiUrl + "/bike" + element['bike_id'];
      this.httpClient.get(equipmentInfoUrl, this.httpOptions)
        .subscribe(
          (data: any[]) => {
            console.log(data);
          }
        );
    });
  }
}
