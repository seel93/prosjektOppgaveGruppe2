//source: http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
@Injectable()
export class AuthService {

  constructor() { }
  private subject = new Subject<any>();
 
  sendMessage(message: string, employee: boolean) {
      this.subject.next({ 
          text: message,
          status: employee  
        });
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}
