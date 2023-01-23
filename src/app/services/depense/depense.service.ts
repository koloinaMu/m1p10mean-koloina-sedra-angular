import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  constructor(private http: HttpClient) { }

  depenser(depot) {
    //console.log("INSERT essai");
    return this.http.post(baseUrl+'depenser',depot,{responseType:'text'});
  }
}
