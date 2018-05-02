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
  public selectedEquipment: any[];
  public selectedBike: any[];

  //api data:
  public equipmentList: any[];
  public nonBikeEquipment: any[];/*  {
    id: number,
    name: string
    belongsToPlace: number,
    bike_id: number,
    dailyPrice: number,
    equipmentCode: string,
    frame: string,
    hourPrice: number,
    lastSeenOnPlace: number,
    name: string,
    type: string,
    status: string
    wheelSize: string,
  }[]; */

  public bikeEquipmnet: any[]; /* {
    id: number,
    name: string
    belongsToPlace: number,
    bike_id: number, 
    dailyPrice: number,
    equipmentCode: string, 
    frame: string,
    hourPrice: number, 
    lastSeenOnPlace: number, 
    name: string, 
    type: string, 
    status: string
    wheelSize: string,
  }[]; */

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
    console.log(item["bike_id"]);
    if (dropdown == 'bike') {
      this.selectedBike = item;
    } else {
      this.selectedEquipment.push(item.toString());
    }
  }

  preparePayload() {
    let payload = {

    }
    return payload;
  }

  submitOrder(){

  }


}
