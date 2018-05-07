import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  //api data
  public equipmentList : any [];
  public orderList : any [] = Array();
  placesList: any[] = Array();

  // scope data
  public selectedEquipment: Object = {};
  public selectedEquipmentName: string = " ";
  public selectedEquipmentStatus: string = " ";
  public selectedEquipmentLocation: Object = {};
  public assignedPlaceId: number = 0;
  public assignedSatus: string = "";
  employee: boolean = true;
  auth: boolean = false;

  httpOptions = { // http-headers for API
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  
  constructor(private httpClient: HttpClient, private authService: AuthService) { }
  
  ngOnInit() {
    this.auth = this.authService.checkEmployment();
    this.fetchPlaces();    
  }
  
  notifyUponSubmission() {
    let validLogging = new Notification("Du er logget inn", {
      body: "Sjekk/endre status på utstyr"
    });
    setTimeout(validLogging.close.bind(validLogging), 5000);
  }
  
  onSubmit(f: NgForm) { // html-form som tar i mot brukernavn og passord
    console.log(f.value);
    this.loggIn(f.value);
  }
  
  sendMessage(name: string, employee: boolean, userId: number): void {
    this.authService.sendMessage("logget inn som ansatt " + name, employee, userId);
  }
  
  loggIn(data) {
    let loggInnUrl = environment.ApiUrl + "/auth"; // api logg inn url
    let payload = { // objektet som blir sendt med http-request
      Username: data.username,
      Password: data.password,
      IsEmployee: this.employee
    }
    console.log(payload);
    this.httpClient.post(loggInnUrl, payload, this.httpOptions) // http-post
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.auth = true;
          this.notifyUponSubmission();
          this.fetchEquipment();
          this.fetchOrders();
        },
        (err) => {
          if (err.status == 200) {
            this.auth = true;
          } else {
          }
        }
      )
    this.sendMessage(data.username, this.employee, data.Creds_id);
  }

  fetchEquipment(){
    let equipmentEndpoint = environment.ApiUrl + "/bike";
      this.httpClient.get(equipmentEndpoint, this.httpOptions)
        .subscribe(
          (data : any) => {
            this.equipmentList = data;
          },
          (error) =>{
            console.log(error);
          }, 
          () => {
            console.log("succes");
          }
    );
  }
  
  fetchOrders(){
    let orderUrl = environment.ApiUrl + "/order";
    this.httpClient.get(orderUrl, this.httpOptions)
      .subscribe(
        (data: any []) => {
          this.orderList = data;
        }
      )
  }

  fetchPlaces() {
    let placesUrl = environment.ApiUrl + "/place";
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
          console.log("succes for places");
        }
    );
  }

  statusConfig(equipment){
    this.selectedEquipment = Object.assign({}, equipment);
    this.selectedEquipmentStatus = equipment.status;
    this.selectedEquipmentName = equipment.name;
  }

  locationConfig(equipment){
    console.log(this.placesList[equipment['lastSeenOnPlace']]); 
    this.selectedEquipment = Object.assign({}, equipment);
    this.selectedEquipmentLocation = Object.assign({},this.placesList[equipment['lastSeenOnPlace']]);
    this.selectedEquipmentName = equipment.name;
    console.log(this.selectedEquipmentLocation);
  }

  assignNewPlace(id: number){
    this.assignedPlaceId = id;
  }

  assignNewStatus(status: string){
    this.assignedSatus = status;
  }

  updateLocationOrStatus(fieldForUpdate){
    if(fieldForUpdate == 'location'){
      this.selectedEquipment['lastSeenOnPlace'] = this.assignedPlaceId;
    }else{
      this.selectedEquipment['status'] = this.assignedSatus;
    }
    let updateBikeUrl = environment.ApiUrl + "/bike" + "/" + this.selectedEquipment['bike_id'];
    let payload = Object.assign({}, this.selectedEquipment);
    console.log(payload);
    this.httpClient.put(updateBikeUrl, payload, this.httpOptions)
      .subscribe(
        (data: any[]) => {
          console.log(data);
        }
      );
  }
}
