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
  public equipmentList : any [];
  employee: boolean = true;
  auth: boolean = false;
  apiUrl : string = environment.ApiUrl;

  httpOptions = { // http-headers for API
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  
  constructor(private httpClient: HttpClient, private authService: AuthService) { }
  
  ngOnInit() {
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
  
  sendMessage(name: string, employee: boolean): void {
    this.authService.sendMessage("logget inn som ansatt " + name, employee);
  }
  
  loggIn(data) {
    let loggInnUrl = this.apiUrl + "/auth"; // api logg inn url
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
        },
        (err) => {
          if (err.status == 200) {
            this.auth = true;
            this.notifyUponSubmission();
            this.fetchEquipment();
          } else {
          }
        }
      )
    this.sendMessage(data.username, this.employee);
  }

  fetchEquipment(){
    let equipmentEndpoint = this.apiUrl + "/bike";
    /* let Promise = this.httpClient.get(equipmentEndpoint, this.httpOptions)
      .toPromise()
      .then(
        (res : any) => {
          console.log(res);
          this.equipmentList.push(res);
          console.log(this.equipmentList);
        },
        error => {
          console.log(error);
        }
      ); */

      this.httpClient.get(equipmentEndpoint, this.httpOptions)
        .subscribe(
          (data : any) => {
            this.equipmentList = data;
          }
        )

  }
  

}
