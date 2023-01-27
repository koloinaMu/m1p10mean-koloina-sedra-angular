import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paiement-non-valide',
  templateUrl: './paiement-non-valide.component.html',
  styleUrls: ['./paiement-non-valide.component.scss']
})
export class PaiementNonValideComponent implements OnInit {

  depots:any;

  constructor(
    private router: Router,
    private localStorage:LocalStorageService,
    private voitureService:VoitureService,
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.voitureService.getDepotNonRegle().subscribe(
      (response: any) =>{
       //console.log(response); 
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

  montantPaye(tableau){
    var somme=0;
    //console.log(tableau);
   if(tableau!=undefined){
    for(var i=0;i<tableau.length;i++){
      somme+=(tableau[i].montant);
    }
   }    
    return somme;
  }

  validerPaiement(idDepot,paiement){
    console.log(idDepot);
    console.log(paiement);
    var paiementt={
      id:idDepot,
      paiement:paiement
    };
    this.voitureService.validerPaiement(paiementt).subscribe(
      (response: any) =>{
       //console.log(response);
       this.toastr.success('Paiement validé.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-bottom-left' 
         });
       this.router.navigate(['/paiement-non-valide']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
