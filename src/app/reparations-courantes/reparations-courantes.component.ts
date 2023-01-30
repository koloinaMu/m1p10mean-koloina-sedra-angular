import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';
import {HttpClient} from '@angular/common/http';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



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
    private toastr: ToastrService,
    private router: Router,
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
   // console.log(tableau);
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
   if(tableau!=undefined){
    for(var i=0;i<tableau.length;i++){
      somme+=(tableau[i].montant);
    }
   }    
    return somme;
  }

  recuperer_voiture(id,reparations,piece,paiements){
    var montantTotal=this.montantTotal(reparations,piece);
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
           //alert('reparation fini')
           this.toastr.success('Votre voiture est prête.', '', {
             timeOut: 8000,
             closeButton: true,
             enableHtml: true,
             toastClass: "alert alert-success alert-with-icon",
             positionClass: 'toast-bottom-left'
           });
          this.router.navigate(['/app/historique']);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    }else {
      this.toastr.error('Votre voiture n\'est pas encore prête ou vous n\'avez pas encore payé la totalité de la facture.', '', {
           timeOut: 8000,
           enableHtml: true,
           closeButton: true,
           toastClass: "alert alert-danger alert-with-icon",
           positionClass: 'toast-bottom-left'
         });
    } 
  }

}
