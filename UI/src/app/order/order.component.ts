import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { environment } from '../../environments/environment';

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

  //payload variables for creating order:
  public selectedEquipment: any[] = Array();
  public selectedBike: any[] = Array();
  public totalPrice: number = 0;

  userName: string = "Gjest";
  subscription: Subscription;

  httpOptions = { // http-headers for API
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private authService: AuthService, private notificationService: NotificationService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.fetchEquipment();
    this.getEmployees();
    this.userId = this.authService.getId();
    this.notificationService.testNotification();
  }

  fetchEquipment() {
    let equipmentEndpoint = environment.ApiUrl + "/bike";
    this.httpClient.get(equipmentEndpoint, this.httpOptions)
      .subscribe(
        (data: any[]) => {
          console.log(data);
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
      return element.type != "Sykkel";
    });
    this.bikeEquipmnet = list.filter((element) => {
      return element.type == "Sykkel"
    });
  }

  getEmployees() {
    let EmploymentUrl = environment.ApiUrl + "/employee";
    this.httpClient.get(EmploymentUrl, this.httpOptions)
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
    return numOfDays;
  }

  addHour(numOfHours) {
    this.hourModel = numOfHours.toString();
    return numOfHours;
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

  submitOrder() {
    let createOrderUrl = environment.ApiUrl + "/order";
    this.checkCredentials();
    console.log(this.userName);
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
        OrderDate: new Date(),
        IsAvailableFrom: new Date(),
        MustBeDeliveredBefore: new Date() // denne må avgjøres basert på valg av timer eller dagr
      }
      console.log(payload);
      this.httpClient.post(createOrderUrl, payload, this.httpOptions)
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
      this.httpClient.post(equipmentAndOrderUrl, payload, this.httpOptions)
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
      this.httpClient.post(equipmentAndOrderUrl, payload, this.httpOptions)
        .subscribe(
          (data: any []) =>{
            console.log(data);
          }
        )
    });
    this.notificationService.notifyOrderCompleted(this.orderId);
  }
}
