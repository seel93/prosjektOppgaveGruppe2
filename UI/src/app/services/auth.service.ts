//source: http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
//import * as shajs from 'sha.js/index.js';

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
        this.subject.next({
            text: message,
            status: employee
        });
    }

    clearMessage() {
        this.message = null;
        this.employee = null;
        this.userId = null;
    }

    getUserCredentials() {
        return this.message;
    }

    checkEmployment() {
        return this.employee;
    }

    getId(): number {
        return this.userId;
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    
    getHash(){
        let hash = "hei";
        //shajs("SHA-512", "TEXT");
        return hash; 
    }

}
