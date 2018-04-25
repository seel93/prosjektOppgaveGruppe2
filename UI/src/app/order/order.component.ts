import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public radioModel : string = "1";

  addPerson(numOfPeople){
    this.radioModel = numOfPeople.toString();
  }
  constructor() { }

  ngOnInit() {
  }

}
