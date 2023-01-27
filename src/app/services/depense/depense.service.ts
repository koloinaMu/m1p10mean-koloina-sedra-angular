import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

//const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  private baseUrl=environment.baseUrl;
  constructor(private http: HttpClient) { }

  depenser(depot) {
    //console.log("INSERT essai");
    return this.http.post(this.baseUrl+'depenser',depot,{responseType:'text'});
  }
}
