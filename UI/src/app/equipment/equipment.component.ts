import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  subscription: Subscription;

  constructor(private authService: AuthService){
    this.subscription = this.authService.getMessage().subscribe(
      (message) => { 
        if(message.status){
          console.log(message);
        }
    });
  }

  ngOnInit() {
  }

  onSubmit(f: NgForm) { // html-form som tar i mot brukernavn og passord
    console.log(f.value);
    console.log(f.valid);
  }

}
