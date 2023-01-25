import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

//const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private baseUrl=environment.baseUrl;

  constructor(private http: HttpClient) { }

  insert(utilisateur) {
    //console.log("INSERT essai");
    return this.http.post(this.baseUrl+'inscription',utilisateur,{responseType:'text'});
  }

  connecter(utilisateur) {
   // console.log(utilisateur);
    return this.http.post(this.baseUrl+'connexion',utilisateur,{responseType:'text'});
  }

  update(utilisateur) {
   // console.log(utilisateur);
    return this.http.post(this.baseUrl+'update',utilisateur,{responseType:'text'});
  }

  getAll() {
   // console.log(utilisateur);
    return this.http.get(this.baseUrl+'utilisateurs',{responseType:'json'});
  }
}
