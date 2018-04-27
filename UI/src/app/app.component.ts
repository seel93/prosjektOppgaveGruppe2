import { Component} from '@angular/core';
import {remote, ipcRenderer} from 'electron'; //for å lage menyer filer osv.
import { HomeComponent } from './home/home.component';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Subscription } from 'rxjs/Subscription';
import {AuthService} from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscription: Subscription;
  public isAuthenticated:  boolean = false;
  userName : string = "Gjest";


  constructor(private authService: AuthService){
    this.subscription = this.authService.getMessage().subscribe(
      (message) => { 
        if(message.status){
          console.log(message);
          this.userName = message.text + "som ansatt"; 
        }
        this.userName = message.text; 
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
