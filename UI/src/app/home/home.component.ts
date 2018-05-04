import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
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
  message: string = "hei";
  employee: boolean = false;
  auth: boolean = false; // sjekker om bruker er logget inn (false by default)
  httpOptions = { // http-headers for API
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'my-auth-token'
    })
  };
  apiUrl : string = environment.ApiUrl; // api logg inn url

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router, private notificationService : NotificationService) { }

  ngOnInit() {
    Notification.requestPermission().then((result) => {
    });
  }

  sendMessage(name: string, employee: boolean, userId: number): void {
    this.authService.sendMessage("logged in as user " + name, employee, userId);
  }

  onSubmit(f: NgForm) { // html-form som tar i mot brukernavn og passord
    console.log(f.value);
    this.loggIn(f.value);
  }

  onDateSubmit(d: NgForm){
    console.log(d.value);
  }

  loggIn(data) {
    let payload = { // objektet som blir sendt med http-request
      Username: data.username,
      Password: data.password,
      IsEmployee: this.employee
    }
    console.log(payload);
    let authUrl = this.apiUrl + "/auth";
    let promise = new Promise((resolve, reject) =>{
        this.httpClient.post(authUrl, payload, this.httpOptions) // http-post
          .toPromise()
          .then(
            res => {
              this.auth = true;
              this.notificationService.notifyUponSubmission();
              this.sendMessage(res['username'], this.employee, res['creds_id']);
              console.log(res);
              resolve();
            }, 
            error => {
              if(error.status = "200"){
                this.auth = true;
                this.notificationService.notifyUponSubmission();
                this.sendMessage(data.username, this.employee, data.Creds_id);
                resolve();
            }
          }
        );
    });
    return promise;
  }
}

