import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  apiUrl : string = environment.ApiUrl;

  constructor() { }

  ngOnInit() {
  }

}
