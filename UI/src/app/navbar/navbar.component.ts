import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  message: string;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  loggOff() : void {
    if(window['process']){
      console.log("running electron");
    }else{
      window.location.reload();
    }
  }
}
