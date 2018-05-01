import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public personModel : string = "1";
  public daysModel : string = "1";
  public hourModel : string = "1";
  public groups: boolean;
  public hours: boolean; 
  public days: boolean;
  
  constructor() { }
  
  ngOnInit() {
  }
  
  addPerson(numOfPeople){
    this.personModel = numOfPeople.toString();
    return numOfPeople;
  }

  addDays(numOfDays){
    this.daysModel = numOfDays.toString();
    return numOfDays;
  }

  addHour(numOfHours){
    this.hourModel = numOfHours.toString();
    return numOfHours;
  }

  daysOrHours(choice){
    if(choice == 'hours'){
      this.hours = true;; 
      this.days = false; 
    }else{
      this.hours = false; 
      this.days = true;
    }
  }

  multiplePeople(choice){
    if(choice == 'yes'){
      this.groups = true;
    }else{
      this.groups = false;
      this.personModel = "1";
    }
  }

  preparePayload(){
    let payload = {
      
    }
  }


}
