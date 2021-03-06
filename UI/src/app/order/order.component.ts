import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import {CommonApiCalls} from '../services/commonApiCalls.service';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  //scope variables
  public personModel: string = "1";
  public daysModel: string = "1";
  public hourModel: string = "1";
  public dateModel: Date;
  public groups: boolean;
  public hours: boolean;
  public days: boolean;
  public employee: number;
  public userId: number;

  //api data:
  public equipmentList: any[];
  public nonBikeEquipment: any[];
  public bikeEquipmnet: any[];
  public employess: any[];
  public orderId: any;

  public serviceDataTest: any[];

  //payload variables for creating order:
  public selectedEquipment: any[] = Array();
  public selectedBike: any[] = Array();
  public totalPrice: number = 0;

  userName: string = "Gjest";
  subscription: Subscription;


  constructor(private authService: AuthService, private notificationService: NotificationService, private commonApiCalls: CommonApiCalls, private httpClient: HttpClient) { }

  ngOnInit() {
    this.fetchEquipment();
    this.getEmployees();
    this.userId = this.authService.getId();
    this.serviceDataTest = this.commonApiCalls.fetchEquipment();
    console.log(this.serviceDataTest);

  }

  fetchEquipment() {
    let equipmentEndpoint = environment.ApiUrl + "/bike";
    this.httpClient.get(equipmentEndpoint, environment.httpOptions)
      .subscribe(
        (data: any[]) => {
          this.equipmentList = data;
        },
        error => () => {
        },
        () => {
          this.filterEquipment(this.equipmentList);
        }
      );
  }

  filterEquipment(list) {
    this.nonBikeEquipment = list.filter((element) => {
      return element.type != "Sykkel" && element.status == "klar";
    });
    this.bikeEquipmnet = list.filter((element) => {
      return element.type == "Sykkel" && element.status == "klar";
    });
  }

  getEmployees() {
    let EmploymentUrl = environment.ApiUrl + "/employee";
    this.httpClient.get(EmploymentUrl, environment.httpOptions)
      .subscribe(
        (data: any[]) => {
          this.employess = data;
        },
        error => () => {
          console.log("error:")
        },
        () => {
          this.employee = Math.floor((Math.random() * this.employess.length) + 1);
        }
      );
  }

  addPerson(numOfPeople) {
    this.personModel = numOfPeople.toString();
    return numOfPeople;
  }

  addDays(numOfDays) {
    this.daysModel = numOfDays.toString();
    this.determineDate();
    return numOfDays;
  }

  addHour(numOfHours) {
    this.hourModel = numOfHours.toString();
    this.determineDate();
    return numOfHours;
  }

  setOrderDate(){
    console.log(this.dateModel);
  }

  daysOrHours(choice) {
    if (choice == 'hours') {
      this.hours = true;;
      this.days = false;
    } else {
      this.hours = false;
      this.days = true;
    }
  }

  multiplePeople(choice) {
    if (choice == 'yes') {
      this.groups = true;
    } else {
      this.groups = false;
      this.personModel = "1";
    }
  }

  addEquipOrBike(item, dropdown) {
    if(this.selectedBike.includes(item) || this.selectedEquipment.includes(item)){
      this.notificationService.notifyInvalidEquipmentAdded();
      return;
    }
    if (dropdown == 'bike') {
      this.selectedBike.push(item);
    } else {
      this.selectedEquipment.push(item);
    }
  }
  
  checkCredentials() {
    this.userName = this.authService.getUserCredentials();
  }

  getDayOrHours(): string {
    if (this.hours) {
      return "hourPrice";
    } else {
      return "dailyPrice";
    }
  }
  
  calculatePrice() {
    let price = this.getDayOrHours();
    try{
      this.selectedBike.forEach(element => {
          let elementPrice : number = element[price];
          this.totalPrice = this.totalPrice + elementPrice;
      });
      this.selectedEquipment.forEach(element => {
        let elementPrice : number = element[price];
        this.totalPrice = this.totalPrice + elementPrice;
      });
    }catch(e){
      console.log(e);
    }
    
  }

  determineDate(): Date{
    let orderDate = new Date();
    console.log(this.dateModel);
    console.log(orderDate);
    if(this.hours){
      orderDate.setUTCHours(orderDate.getHours() + parseInt(this.hourModel));
      console.log(orderDate);
      return orderDate;
    }else{
      orderDate.setDate(orderDate.getDate() + parseInt(this.daysModel));
      console.log(orderDate);
      return orderDate;
    }
  }

  submitOrder() {
    if(this.selectedBike.length == 0){
      this.notificationService.notifyInvalidOrderData();
      return;
    }
    let createOrderUrl = environment.ApiUrl + "/order";
    this.checkCredentials();
    if (this.userName == 'Gjest' || !this.userName) {
      this.notificationService.notifyInvalidOrder();
    } else {
      this.getDayOrHours();
      this.calculatePrice();
      let payload = {
        Price: this.totalPrice,
        IsGroupOrder: this.groups ? 1 : 0,
        Customer_id: this.userId,
        Employee_id: this.employee,
        OrderDate: this.dateModel,
        IsAvailableFrom: this.dateModel,
        MustBeDeliveredBefore: this.determineDate()
      }
      console.log(payload);
      this.httpClient.post(createOrderUrl, payload, environment.httpOptions)
        .subscribe(
          (data: any[]) => {
            this.orderId = data[0].order_id;
            console.log(this.orderId);
            this.linkEquipmentToOrder();
          }
        );
    }
  }



  linkEquipmentToOrder(){
    let equipmentAndOrderUrl = environment.ApiUrl + "/bikeandorder";
    this.selectedBike.forEach(element => {
      let payload = {
        Bike_Id: element['bike_id'],
        Order_Id: this.orderId
      }
      this.httpClient.post(equipmentAndOrderUrl, payload, environment.httpOptions)
        .subscribe(
          (data: any []) =>{
            console.log(data);
          }
        )
    });

    this.selectedEquipment.forEach(element => {
      let payload = {
        Bike_Id: element['bike_id'],
        Order_Id: this.orderId
      }
      this.httpClient.post(equipmentAndOrderUrl, payload, environment.httpOptions)
        .subscribe(
          (data: any []) =>{
            console.log(data);
          }
        )
    });
    this.notificationService.notifyOrderCompleted(this.orderId);
    this.updateStatusOfRentedEquipment();
  }

  updateStatusOfRentedEquipment(){
    this.selectedEquipment.forEach(element => {
      let updateUrl = environment.ApiUrl + "/bike" + "/" + element['bike_id'];
      element['status'] = "utleid";
      let payload = {
        Bike_id: element['bike_id'],
        Name: element['name'],
        Type: element['type'],
        DailyPrice: element['dailyPrice'],
        HourPrice: element['hourPrice'],
        EquipmentCode: element['equipmentCode'],
        LastSeenOnPlace: element['lastSeenOnPlace'],
        BelongsToPlace: element['belongsToPlace'],
        WheelSize: element['wheelSize'],
        Frame: element['frame'],
        STATUS: element['status']
      }
      this.httpClient.put(updateUrl, payload, environment.httpOptions)
        .subscribe(
          (data: any []) =>{
            console.log(data);
          }
        )
    });
    this.selectedBike.forEach(element => {
      let updateUrl = environment.ApiUrl + "/bike" + "/" + element['bike_id'];
      element['status'] = "utleid";
      let payload = {
        Bike_id: element['bike_id'],
        Name: element['name'],
        Type: element['type'],
        DailyPrice: element['dailyPrice'],
        HourPrice: element['hourPrice'],
        EquipmentCode: element['equipmentCode'],
        LastSeenOnPlace: element['lastSeenOnPlace'],
        BelongsToPlace: element['belongsToPlace'],
        WheelSize: element['wheelSize'],
        Frame: element['frame'],
        STATUS: element['status']
      }
      this.httpClient.put(updateUrl, payload, environment.httpOptions)
        .subscribe(
          (data: any []) =>{
            console.log(data);
          }
        )
    });
    this.wipeProcessedOrderSelections();
  }

  wipeProcessedOrderSelections(){
    this.selectedBike = [];
    this.selectedEquipment = [];
    this.hours = false;
    this.days = false;
    this.groups = false;
    this.fetchEquipment();
  }
}
