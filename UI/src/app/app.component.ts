import { Component } from '@angular/core';
import {remote, ipcRenderer} from 'electron'; //for å lage menyer filer osv.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(){
    
  }
}
