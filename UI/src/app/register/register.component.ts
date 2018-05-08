import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  public placesList: any[];
  public place: string;
  public date = new Date();


  constructor(private httpClient: HttpClient, private notificationService : NotificationService) { }

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
          console.log("succes for places");
        }
      );
  }

  addPlace(item) {
    this.place = item;
    console.log(this.place);
    this.date = new Date();
  }

  onSubmit(f: NgForm) { // html-form som tar i mot brukernavn og passord
    console.log(f.value);
    let input = f.value;
    if(input.Password == input.secondPassword){
      this.preparePayload(f.value);
    }else{
      //Todo: legg til notification-service
      this.notificationService.notifyInvalidUserCreation();
    }
    
  }

  preparePayload(formData) {
    let payload = {
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      Phone: formData.Phone,
      Email: formData.Email,
      Password: formData.Password,
      Location: this.place['place_id'],
    }
    console.log(payload);
    this.submitCustomer(payload)
  }
  submitCustomer(payload) {
    let newCustomerUrl = environment.ApiUrl + "/customer";
    this.httpClient.post(newCustomerUrl, payload, environment.httpOptions)
      .subscribe(
        (data: any[]) => {
          console.log(data);
        },
        error => () => {
          console.log("error:")
        },
        () => {
          this.notificationService.notifyCustomerCreated();
        }
      );
  }
}
