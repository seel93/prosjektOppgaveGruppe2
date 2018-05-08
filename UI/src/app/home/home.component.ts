import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
@NgModule({
  imports: [
    BrowserModule,
  ],
})

export class HomeComponent implements OnInit {
  message: string;
  employee: boolean = false;
  auth: boolean = false; // sjekker om bruker er logget inn (false by default)


  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router, private notificationService : NotificationService) { }

  ngOnInit() {
    Notification.requestPermission().then((result) => {
    });
    if(this.authService.getUserCredentials()){
      this.auth = true;
    }
  }

  sendMessage(name: string, employee: boolean, userId: number): void {
    this.authService.sendMessage("logged in as user " + name, employee, userId);
  }

  onSubmit(f: NgForm) { // html-form som tar i mot brukernavn og passord
    let inputData = f.value;
    this.message = inputData.username;
    if(!inputData.username || !inputData.password){
      this.notificationService.notifyInvalidCredentials();
    }else{
      this.loggIn(inputData);
    }
  }

  loggIn(data) {
    let payload = { // objektet som blir sendt med http-request
      Username: data.username,
      Password: data.password,
      IsEmployee: this.employee
    }
    console.log(payload);
    let authUrl = environment.ApiUrl + "/auth";
    this.httpClient.post(authUrl, payload, environment.httpOptions)
    .subscribe(
      (data) =>{
        if(data['creds_id'] && data['password'] && data['username']){
          this.auth = true;
          this.notificationService.notifyUponSubmission();
          this.sendMessage(data['username'], this.employee, data['creds_id']);
        }
        (error)=>{
          this.notificationService.alertApiError(error);

        }
        }
    );
  }

  redirectUser(route){
    if(route == 'history'){
      this.router.navigate(['/user'+ '/' + this.authService.getId()]);
    }else{
      this.router.navigate(['/order']);
    }
  }
}

