import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  public equipmentList: any[];
  public placesList: any[];
  public selectedPlace: Object = {};
  public selectedEquipmentName: string = "";
  userName: string = "Gjest";
  subscription: Subscription;

  constructor(private authService: AuthService, private notificationService: NotificationService, private httpClient: HttpClient) {
    this.subscription = this.authService.getMessage().subscribe(
      (message) => {
        if (message.status) {
          console.log(message);
        }
      });
  }

  ngOnInit() {
    this.fetchPlaces();
  }

  fetchPlaces() {
    let placesUrl = environment.ApiUrl + "/place";
    this.httpClient.get(placesUrl, environment.httpOptions)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.placesList = data;
        },
        error => () => {
          console.log("error:")
        },
        () => {
          this.fetchEquipment();
          this.notificationService.notifyEquipmentRecieved();
          console.log("succes for places");
        }
      );
  }

  fetchEquipment() {
    let equipmentEndpoint = environment.ApiUrl + "/bike";
    this.httpClient.get(equipmentEndpoint, environment.httpOptions)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.equipmentList = data;
        },
        error => () => {
          console.log("error:")
        },
        () => {
          console.log("succes for equipment")
        }
      );
  }

  modalTrigger(index, name) {
    this.selectedPlace = Object.assign({}, this.placesList[this.placesList.findIndex(place => place.place_id === index)]);
    this.selectedEquipmentName = name;
  }

  orderByCriteria(criteria: string) {
    let url = environment.ApiUrl + "/status";
    let payload = {};
    if (criteria == 'pris') {
      payload = { criteria: "price" }
    } else if (criteria == 'validStatus') {
      payload = { criteria: "validStatus" }

    }else if(criteria == 'prisDag'){
      payload = {criteria: 'priceDay'}
    }else {
      payload = { criteria: "invalidStatus" }
    }

    this.httpClient.post(url, payload, environment.httpOptions)
      .subscribe(
        (data: any[]) => {
          this.equipmentList = data;
        }
      )
  }
}
