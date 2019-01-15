import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService{

    /*
    Used for passing organization data between 
    survey component and organization list component
    */
    private source = new BehaviorSubject([]);
    currentList = this.source.asObservable();

    constructor() {}

    updateList(data: any[]) {
        this.source.next(data) 
    }
    
}