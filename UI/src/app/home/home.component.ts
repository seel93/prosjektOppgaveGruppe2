import { Component, OnInit, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../auth.service';


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
  auth: boolean = false; // sjekker om bruker er logget inn (false by default)
  httpOptions = { // http-headers for API
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  url = "http://localhost:5000/api/test/auth"; // api logg inn url

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit() {
  }

  sendMessage(name: string): void {
    // send message to subscribers via observable subject
    this.authService.sendMessage(name);
}

  onSubmit(f: NgForm) { // html-form som tar i mot brukernavn og passord
    this.loggIn(f.value);
  }

  loggIn(data) {
    let payload = { // objektet som blir sendt med http-request
      Username: data.username,
      Password: data.password
    }
    console.log(payload);
    this.httpClient.post(this.url, payload, this.httpOptions) // http-post
      .subscribe(
        (data: any[]) => {
          console.log(data);
        },
        (err) => {
          if (err.status == 200) {
            this.auth = true;
          } else {
          }
        }
      )
      this.sendMessage(data.username);
    }
}

