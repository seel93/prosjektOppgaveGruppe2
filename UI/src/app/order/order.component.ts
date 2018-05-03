import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
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
  

  //api data:
  public equipmentList: any[];
  public nonBikeEquipment: any[];
  public bikeEquipmnet: any[]; 

  //payload variables for creating order:
  public selectedEquipment: any[] = Array();
  public selectedBike: any[] = Array();
  public totalPrice : number;

  apiUrl: string = environment.ApiUrl;
  subscription: Subscription;

  httpOptions = { // http-headers for API
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.fetchEquipment();
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

  fetchEquipment() {
    let equipmentEndpoint = this.apiUrl + "/bike";
    this.httpClient.get(equipmentEndpoint, this.httpOptions)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.equipmentList = data;
        },
        error => () => {
          console.log("error:")
        },
        () => {
          console.log("succes for equipment");
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

  addEquipOrBike(item, dropdown) {
    console.log(this.bikeEquipmnet);
    console.log(item);
    if (dropdown == 'bike') {
      this.selectedBike.push(item);
    } else {
      this.selectedEquipment.push(item);
    }

    console.log(this.selectedBike);
    console.log(this.selectedEquipment);
  }

  preparePayload() {
    let payload = {
      Price: this.totalPrice,
      IsGroupOrder: this.groups,
      Customer_id: null, // denne er litt stress
      Employee_id: null, // også en smule tricky
      OrderDate: new Date(),
      IsAvailableFrom: new Date(),
      MustBeDeliveredBefore: null // denne må avgjøres basert på valg av timer eller dagr
    }
    return payload;
  }

  submitOrder(){

  }


}
