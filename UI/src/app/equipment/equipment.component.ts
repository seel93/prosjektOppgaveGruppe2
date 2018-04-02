import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) { // html-form som tar i mot brukernavn og passord
    console.log(f.value);
    console.log(f.valid);
  }

}
