import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


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
  isAuthAsAdmin: boolean = false;
  httpOptions = { // http-headers for API
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  url = "http://localhost:5000/api/auth"; // api logg inn url

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    Notification.requestPermission().then(function(result) {
    });
  }

  sendMessage(name: string): void {
    // send message to subscribers via observable subject
    if (this.isAuthAsAdmin) {
      this.authService.sendMessage("logged in as employee " + name);
      this.router.navigate(['/admin']);

    } else {
      this.authService.sendMessage("logged in as user " + name);
    }
  }

  notifyUponSubmission() {
    let validLogging = new Notification("Du er logget inn", {
      body: "Nå kan du velge område og tidsrom du vil leie utstyr i"
    });
    setTimeout(validLogging.close.bind(validLogging), 5000);
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
      IsEmployee: data.isEmployee
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
            this.notifyUponSubmission();
          } else {
          }
        }
      )
    this.sendMessage(data.username);
  }
}

