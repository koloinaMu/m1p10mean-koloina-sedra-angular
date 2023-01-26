import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {Voiture} from '../objets/Voiture';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-depot-voiture',
  templateUrl: './depot-voiture.component.html',
  styleUrls: ['./depot-voiture.component.scss']
})
export class DepotVoitureComponent implements OnInit {

  voiture={
    id:'',
    immatriculation:'',
    couleur:''
  };
  options:string[];
  user:any;
  reparations:any[];
  idDepot:string;

  constructor(
    private localStorage:LocalStorageService,
    private voitureService:VoitureService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("utilisateur"));
    this.voiture.immatriculation=this.user.voiture.immatriculation;
    this.voiture.couleur=this.user.voiture.couleur;
    this.options = [
       'Rouge',
       'Noir',
       'Gris',
       'Blanc'
    ];
    this.voitureService.getReparationPrixFromNode().subscribe(
      (response: any) =>{
       console.log(response);  
       this.reparations=response;     
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  deposer(){
    var depot={
      utilisateur:this.user,
      voiture:this.voiture
    };
    //console.log(this.voiture.immatriculation+" de couleur "+this.voiture.couleur);
    //console.log(this.user);
    this.voitureService.deposer(depot).subscribe(
      (response: any) =>{ 
        console.log(response);
       if(response=='null'){
        this.toastr.error('Votre voiture est déjà au garage.', '', {
           timeOut: 8000,
           enableHtml: true,
           closeButton: true,
           toastClass: "alert alert-danger alert-with-icon",
           positionClass: 'toast-bottom-left' 
         });
       }else{
        response=(JSON.parse(response));
        this.idDepot=response._id; 
        this.toastr.success('Veuillez sélectionner les services.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-bottom-left' 
         });
        //alert("Insertion réussie, veuillez sélectionner parmi nos services votre requête");
       }       
          //this.router.navigate(['/reparations-courantes']);      
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

  choisir_reparation(idReparation,nom,prix){
    this.voitureService.choisir_reparationFromNode(this.idDepot,idReparation,nom,prix).subscribe(
      (response: any) =>{
         console.log("REUSSI");
         //alert("reparation inserer")
         console.log(response);
         this.toastr.success('Demande reçue.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-bottom-left' 
         });
       //this.router.navigate(['/utilisateurs']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

}
