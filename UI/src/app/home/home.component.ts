import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


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
  userName: string = "";

  @Output() messageEvent = new EventEmitter<string>();



  auth: boolean = false; // sjekker om bruker er logget inn (false by default)
  httpOptions = { // http-headers for API
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  url = "http://localhost:5000/api/test/auth"; // api logg inn url

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) { // html-form som tar i mot brukernavn og passord
    console.log(f.value);
    console.log(f.valid);
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
            console.log("a ok");
            this.auth = true;
            this.messageEvent.emit(this.userName);
            console.log(this.userName);
          } else {
            console.log("invalid credentials");
          }
        }
      )
  }
}

