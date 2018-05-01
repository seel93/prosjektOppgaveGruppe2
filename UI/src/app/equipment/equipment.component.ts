import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  public equipmentList : any [];
  public placesList : any [];
  subscription: Subscription;

  httpOptions = { // http-headers for API
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private authService: AuthService, private httpClient: HttpClient){
    this.subscription = this.authService.getMessage().subscribe(
      (message) => { 
        if(message.status){
          console.log(message);
        }
    });
  }

  ngOnInit() {
    this.fetchEquipment();
    this.fetchPlaces();
  }

  fetchEquipment(){
    /* let equipmentEndpoint = "http://localhost:5000/api/bike";
      this.httpClient.get(equipmentEndpoint, this.httpOptions)
        .subscribe(
          (data : any) => {
            this.equipmentList = data;
          }
        ); */
  }

  fetchPlaces(){
    let placesUrl = "http://localhost:5000/api/place";
    /* this.httpClient.get(placesUrl, this.httpOptions)
    .subscribe(
      (data : any) => {
        this.placesList = data;
        console.log(this.placesList);
      }
    ); */

  }

  onSubmit(f: NgForm) { // html-form som tar i mot brukernavn og passord
    console.log(f.value);
    console.log(f.valid);
  }

}
