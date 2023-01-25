import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

//const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  private baseUrl=environment.baseUrl;

  constructor(private http: HttpClient) { }

  deposer(depot) {
    //console.log("INSERT essai");
    return this.http.post(this.baseUrl+'depot-voiture',depot,{responseType:'text'});
  }

  getReparationsCourantesUtilisateur(utilisateur) {
   // console.log(utilisateur);
    return this.http.post(this.baseUrl+'reparations-courantes',utilisateur,{responseType:'json'});
  }

  rechercherDepotVoiture(aPropos) {
   // console.log(utilisateur);
    return this.http.post(this.baseUrl+'recherche',aPropos,{responseType:'json'});
  }

  sortieVoiture(aPropos) {
   // console.log(utilisateur);
    return this.http.post(this.baseUrl+'sortieVoiture',aPropos,{responseType:'json'});
  }

  depotVoitureJour(option) {
   // console.log(utilisateur);
    return this.http.post(this.baseUrl+'chiffreAffaire',option,{responseType:'json'});
  }

  paiement(aPropos) {
   // console.log(utilisateur);
    return this.http.post(this.baseUrl+'paiement',aPropos,{responseType:'json'});
  }

  getDepotNonRegle() {
   // console.log(utilisateur);
    return this.http.get(this.baseUrl+'factures-non-reglees',{responseType:'json'});
  }

  validerPaiement(aPropos) {
   // console.log(utilisateur);
    return this.http.post(this.baseUrl+'validerPaiement',aPropos,{responseType:'json'});
  }

  tmpsReparationsMoyens(){
    return this.http.get(this.baseUrl+'tmpsReparationsMoyens',{responseType:'json'});
  }

  beneficeMensuel(){
    return this.http.get(this.baseUrl+'beneficeMensuel',{responseType:'json'});
  }

  getReparationPrixFromNode()
  {
    return this.http.get(this.baseUrl+"reparation_prix",{responseType:'json'});

  }

  choisir_reparationFromNode(idDepot,idReparation,nom,prix){
    return this.http.post(this.baseUrl+"ajouterreparationchoisissez/" + idDepot+ "/" + idReparation + "/" + nom + "/" +prix ,{responseType:'json'});
  }

  recuperer_voiture_From_Node(id_depot){
    return this.http.post(this.baseUrl+"recuperer_voiture/"+id_depot,{responseType:'json'});
  }

  bonSortie(id_depot){
    return this.http.post(this.baseUrl+"bonSortie/"+id_depot,{responseType:'json'});
  }
}
