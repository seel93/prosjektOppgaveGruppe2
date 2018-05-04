//source: http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
@Injectable()
export class AuthService {

  constructor() { }
  private subject = new Subject<any>();
  public message: string; 
  public employee: boolean; 
  public userId: number;
 
  sendMessage(message: string, employee: boolean, userId: number) {
    this.message = message;
    this.employee = employee;  
    this.userId = userId;
    console.log(userId);
    this.subject.next({ 
          text: message,
          status: employee  
        });
  }

  clearMessage() {
      this.subject.next({
          text: null,
          status: null
      });
  }

  getUserCredentials(){
      return this.message;
  }

  checkEmployment(){
      return this.employee;
  }

  getId(): number{
      return this.userId;
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}
