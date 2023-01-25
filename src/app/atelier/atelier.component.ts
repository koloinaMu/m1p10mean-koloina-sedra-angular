import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {VoitureService} from '../services/voiture/voiture.service';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-atelier',
  templateUrl: './atelier.component.html',
  styleUrls: ['./atelier.component.scss']
})
export class AtelierComponent implements OnInit {

  user:any;
  voiture:any;
  private baseUrl=environment.baseUrl;

  constructor(private http: HttpClient, private localStorage:LocalStorageService,
  private router:Router, private modalService: NgbModal, 
  private voitureService:VoitureService) { }

  ngOnInit(): void {
    this.listeVoiture_dans_atelier_From_Node().subscribe(
      (response: any) =>{
      // console.log(response);
       this.voiture=response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public listeVoiture_dans_atelier_From_Node(){
    return this.http.get(this.baseUrl+"dans_atelier",{responseType:'json'});
  }

  public update_avancement_FromNode(avancement,idReparation,idDepot){
    return this.http.post(this.baseUrl+"modifier_avancement/" +avancement +"/"+ idReparation+ "/" + idDepot ,{responseType:'json'});
  }

  public modifier_avancement(avancement,idReparation,idDepot){
    this.update_avancement_FromNode(avancement,idReparation,idDepot).subscribe(
      (response: any) =>{
        // console.log("REUSSI");
         alert("avancement modifie avec succes")
         //console.log(response);
       //this.router.navigate(['/utilisateurs']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  open(content) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title',windowClass: 'modif' });
    //modalRef.componentInstance.utilModif.mail=mail;
    //modalRef.componentInstance.utilModif.type=type;
  }

  montantTotal(tableau){
    var somme=0;
    //console.log(tableau);
   if(tableau!=undefined){
    for(var i=0;i<tableau.length;i++){
      somme+=(tableau[i].prix);
    }
   }    
    return somme;
  }

  montantPaye(tableau){
    var somme=0;
   if(tableau!=undefined){
    for(var i=0;i<tableau.length;i++){
      somme+=(tableau[i].montant);
    }
   }    
    return somme;
  }

  resteAPayer(reparations,paiements){
    var montantTotal=this.montantTotal(reparations);
    var montantPaye=this.montantPaye(paiements);
    var result=montantTotal-montantPaye;   
    var resultReparation=true;
    for(var i=0;i<reparations.length;i++){
      //console.log("reparation fait="+reparations[i].avancement);
      if(reparations[i].avancement<100){
        resultReparation=false;
        break;
      }
    }
    var reste=result;
    if(resultReparation==true && reste==0)
    {
      document.getElementById("sortie").style.display="block";
    } 
    return result;
  }

  sortie(idDepot){
    console.log(idDepot);
    this.voitureService.bonSortie(idDepot).subscribe(
      (response:any)=>{
        this.router.navigate(['/dans-atelier']);
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  nomModel(idReparation){
    return 'avancement'+idReparation;
  }

}
