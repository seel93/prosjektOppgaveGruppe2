import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  public equipmentList: any[];
  public placesList: any[];
  apiUrl : string = environment.ApiUrl;
  userName : string = "Gjest";
  subscription: Subscription;

  httpOptions = { // http-headers for API
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private authService: AuthService, private notificationService : NotificationService,  private httpClient: HttpClient) {
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
    let placesUrl = this.apiUrl + "/place";
    this.httpClient.get(placesUrl, this.httpOptions)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.placesList = data;
        },
        error => () => {
          console.log("error:" )
        },
        () => {
          this.fetchEquipment();
          this.notificationService.notifyEquipmentRecieved();
          console.log("succes for places");
        }
    );
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
        console.log("error:" )
      },
      () => {
        console.log("succes for equipment")
      }
    );
  }

  modalTrigger(){
    console.log("this works");
  }
}
