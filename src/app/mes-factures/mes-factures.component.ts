import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mes-factures',
  templateUrl: './mes-factures.component.html',
  styleUrls: ['./mes-factures.component.scss']
})
export class MesFacturesComponent implements OnInit {

  user:any;
  depots:any;
  montant:number;

  constructor(
    private router: Router,
    private localStorage:LocalStorageService,
    private voitureService:VoitureService,
    private modalService: NgbModal,
    private toastr: ToastrService
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

  montantTotal(tableau,piece){
    var somme=0;
    //console.log(tableau);
   if(tableau!=undefined){
    for(var i=0;i<tableau.length;i++){
      somme+=(tableau[i].prix);
    }
   } 
   if(piece!=undefined){
    for(var i=0;i<piece.length;i++){
      somme+=(piece[i].prix);
    }
   }    
    return somme;
  }

  montantPaye(tableau){
    var somme=0;
    console.log(tableau);
   if(tableau!=undefined){
    for(var i=0;i<tableau.length;i++){
      somme+=(tableau[i].montant);
    }
   }    
    return somme;
  }

  resteAPayer(reparations,piece,paiements){
    var montantTotal=this.montantTotal(reparations,piece);
    var montantPaye=this.montantPaye(paiements);
    var result=montantTotal-montantPaye;
    if(result>0){
      document.getElementById("fichePaiement").style.display="block";
    }
    return result;
  }

  payer(idDepot){
    var paiement={
      id:idDepot,
      montant:this.montant
    };
    console.log(paiement);
    this.voitureService.paiement(paiement).subscribe(
      (response: any) =>{
        this.toastr.success('Paiement effectué, en attente de validation.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-bottom-left'
         });
        this.router.navigate(['/mes-factures']);
       //console.log(response); 
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
