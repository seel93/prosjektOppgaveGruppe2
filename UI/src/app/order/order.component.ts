import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public personModel : string = "1";
  public daysModel : string = "1";
  public hourModel : string = "1";
  public groups: boolean;
  public hours: boolean; 
  public days: boolean;
  public equipmentList : any[];
  apiUrl : string = environment.ApiUrl;
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
  
  addPerson(numOfPeople){
    this.personModel = numOfPeople.toString();
    return numOfPeople;
  }

  addDays(numOfDays){
    this.daysModel = numOfDays.toString();
    return numOfDays;
  }

  addHour(numOfHours){
    this.hourModel = numOfHours.toString();
    return numOfHours;
  }

  daysOrHours(choice){
    if(choice == 'hours'){
      this.hours = true;; 
      this.days = false; 
    }else{
      this.hours = false; 
      this.days = true;
    }
  }

  fetchEquipment() {
    let equipmentEndpoint = "http://localhost:5000/api/bike";
    this.httpClient.get(equipmentEndpoint, this.httpOptions)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.equipmentList = data;
      }
    );
  }

  multiplePeople(choice){
    if(choice == 'yes'){
      this.groups = true;
    }else{
      this.groups = false;
      this.personModel = "1";
    }
  }

  preparePayload(){
    let payload = {
      
    }
  }


}
