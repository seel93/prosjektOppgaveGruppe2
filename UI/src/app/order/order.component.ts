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
  userName : string = "Gjest";
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

  checkCredentials(){
    this.userName = this.authService.getUserCredentials();
  }

  submitOrder(){
    this.checkCredentials();
    console.log(this.userName);
    if(this.userName == 'Gjest'){
      this.notifyInvalidOrder();
    }else{
      this.getDayOrHours();
      this.calculatePrice();
    }
  }

  notifyInvalidOrder() {
    let error = new Notification("Feil:", {
      body: "Du kan ikke lagen en bestilling uten å være logget inn",
      icon: '../assets/icons/bike-21-512.png'
    });
    setTimeout(error.close.bind(error), 8000);
  }

  getDayOrHours(){ 
    if(this.hours){
      return "hourPrice";
    }else{
      return "dailyPrice";
    }
  }

  calculatePrice(){
    let result : number = 0;
    let price = this.getDayOrHours();
    console.log(price); 

    for(let i = 0; i < this.selectedBike.length; i++){
      console.log(this.selectedBike[i].price);
      result += this.selectedBike[i].price.toString;
    }

    for(let j = 0; j < this.selectedEquipment.length; j++){
      result += this.selectedEquipment[j];
    }

    this.selectedBike.forEach(element => {
      console.log(element.price.toString());
    });

    //console.log(result);
    return result;
  }


}
