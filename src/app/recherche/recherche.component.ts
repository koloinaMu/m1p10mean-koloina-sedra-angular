import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

  voiture={
    immatriculation:'',
    couleur:''
  };
  options:string[];
  depots:any[];
  type:number;
  private baseUrl=environment.baseUrl;

  constructor(
    private voitureService:VoitureService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.options = [
       'Couleur',
       'Rouge',
       'Noir',
       'Gris',
       'Blanc'
    ];
    this.type=(Number)(localStorage.getItem("typeUtilisateur"));
   // console.log(this.type);
  }

  rechercher(){
   // console.log(this.voiture);
    this.voitureService.rechercherDepotVoiture(this.voiture).subscribe(
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

  public update_avancement_FromNode(avancement,idReparation,idDepot){
    return this.http.post(this.baseUrl+"modifier_avancement/" +avancement +"/"+ idReparation+ "/" + idDepot ,{responseType:'json'});
  }

  public modifier_avancement(avancement,idReparation,idDepot){
    this.update_avancement_FromNode(avancement,idReparation,idDepot).subscribe(
      (response: any) =>{
        // console.log("REUSSI");
         //alert("avancement modifie avec succes")
         this.toastr.success('Avancement réussi.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-bottom-left'
         });
         //console.log(response);
       //this.router.navigate(['/utilisateurs']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
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

  resteAPayer(depot){
    console.log(depot);
    var reparations=depot.reparations;
    var paiements=depot.paiements;
    var reception=depot.dateReception;
    var sortie=depot.dateSortie;
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
    if(resultReparation==true && reste==0 && (reception!=undefined && sortie==undefined))
    {
      document.getElementById("sortie").style.display="block";
    } 
    return result;
  }

  sortie(idDepot){
    console.log(idDepot);
    this.voitureService.bonSortie(idDepot).subscribe(
      (response:any)=>{
        this.toastr.success('Bon de sortie validé.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-bottom-left'
         });
        this.router.navigate(['/dans-atelier']);
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  nomModel(idReparation){
    return 'avancement'+idReparation;
  }

  public receptionnerFromNode(id){
      return this.http.post(this.baseUrl+"receptionner_vehicule/"+id,{responseType:'json'});
  }

  public receptionner(id){
    //depot=JSON.parse(localStorage.getItem("depot"));
    // console.log("modif "+this.utilModif.mail+" to type "+this.utilModif.type);
     this.receptionnerFromNode(id).subscribe(
       (response: any) =>{
          console.log("REUSSI");
          console.log(response);
          //alert('insertion dans le garage  reussi')
          this.toastr.success('Voiture bien reçue.', '', {
             timeOut: 8000,
             closeButton: true,
             enableHtml: true,
             toastClass: "alert alert-success alert-with-icon",
             positionClass: 'toast-bottom-left' 
           });
          this.router.navigate(['/dans-atelier']);
       },
       (error: HttpErrorResponse) => {
         console.log(error.message);
       }
     )
   }

}
