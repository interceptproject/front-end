import { Injectable } from '@angular/core';
import { Http }from '@angular/http';

@Injectable()
export class AjaxService {
    
    constructor(private http: Http) {}
    
    test() {
        console.log("I am working");
        console.log("Hallelujah");
    }
}