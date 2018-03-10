import { Component, OnInit } from '@angular/core';
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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  url="http://localhost:5000/api/test/auth";

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this.loggIn(f.value);
  }

  loggIn(data){
    let payload = {
      Name: data.username, 
      Balance: data.password
    }
    this.httpClient.post(this.url, payload, this.httpOptions)
    .subscribe(
      (data:any[]) => {
        console.log(data);
      }
    )
  } 
}

