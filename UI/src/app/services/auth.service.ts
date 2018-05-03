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
 
  sendMessage(message: string, employee: boolean) {
    this.message = message;
    this.employee = employee;  
    this.subject.next({ 
          text: message,
          status: employee  
        });
  }

  clearMessage() {
      this.subject.next();
  }

  getUserCredentials(){
      return this.message;
  }

  checkEmployment(){
      return this.employee;
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}
