import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http: HttpClient) { }

  deposer(depot) {
    //console.log("INSERT essai");
    return this.http.post(baseUrl+'depot-voiture',depot,{responseType:'text'});
  }

  getReparationsCourantesUtilisateur(utilisateur) {
   // console.log(utilisateur);
    return this.http.post(baseUrl+'reparations-courantes',utilisateur,{responseType:'json'});
  }

  rechercherDepotVoiture(aPropos) {
   // console.log(utilisateur);
    return this.http.post(baseUrl+'recherche',aPropos,{responseType:'json'});
  }

  sortieVoiture(aPropos) {
   // console.log(utilisateur);
    return this.http.post(baseUrl+'sortieVoiture',aPropos,{responseType:'json'});
  }

}
