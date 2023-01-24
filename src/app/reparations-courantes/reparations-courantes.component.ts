import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';
import {HttpClient} from '@angular/common/http';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-reparations-courantes',
  templateUrl: './reparations-courantes.component.html',
  styleUrls: ['./reparations-courantes.component.scss']
})
export class ReparationsCourantesComponent implements OnInit {

  user:any;
  depots:any;
  prixReparation: any;

  constructor(
    private localStorage:LocalStorageService,
    private voitureService:VoitureService,
    private modalService: NgbModal,
    private http: HttpClient,
    ) { }



  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("utilisateur"));
    this.voitureService.getReparationsCourantesUtilisateur(this.user).subscribe(
      (response: any) =>{

       console.log(response); 
       this.depots=response; 
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  open(content) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title',windowClass: 'modif' });
    //modalRef.componentInstance.utilModif.mail=mail;
    //modalRef.componentInstance.utilModif.type=type;
  }

  montantTotal(tableau){
    var somme=0;
   // console.log(tableau);
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

  recuperer_voiture(id,reparations,paiements){
    var montantTotal=this.montantTotal(reparations);
    var montantPaye=this.montantPaye(paiements);
    var result=montantTotal-montantPaye;   
    var resultReparation=true;
    for(var i=0;i<reparations.length;i++){
      if(reparations[i].avancemen<100){
        resultReparation=false;
        break;
      }
    }
    var reste=result;
    if(resultReparation==true && reste==0)
    {
      this.voitureService.recuperer_voiture_From_Node(id).subscribe(
        (response: any) =>{
           console.log("REUSSI");
           console.log(response);
           alert('reparation fini')
         //this.router.navigate(['/utilisateurs']);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    }     
  }

}
