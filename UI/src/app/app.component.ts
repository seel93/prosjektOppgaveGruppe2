import { Component } from '@angular/core';
import {remote, ipcRenderer} from 'electron'; //for å lage menyer filer osv.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isAuthenticated:  boolean = false;

  userName : string = "Gjest";

  constructor(){
    
  }

  recieveUserName($event){
    console.log("event triggered");
    this.userName = $event;
  }
}
