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


    public choisir_reparationFromNode(idDepot,idReparation,nom,prix){
      return this.http.post("http://localhost:3000/ajouterreparationchoisissez/" + idDepot+ "/" + idReparation + "/" + nom + "/" +prix ,{responseType:'json'});
    }

    public choisir_reparation(idDepot,idReparation,nom,prix){
      this.choisir_reparationFromNode(idDepot,idReparation,nom,prix).subscribe(
        (response: any) =>{
           console.log("REUSSI");
           alert("reparation inserer")
           console.log(response);
         //this.router.navigate(['/utilisateurs']);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    }

    public getReparationPrixFromNode()
    {
      return this.http.get("http://localhost:3000/reparation_prix",{responseType:'json'});

    }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("utilisateur"));
    this.voitureService.getReparationsCourantesUtilisateur(this.user).subscribe(
      (response: any) =>{

       //console.log(response); 
       this.depots=response; 
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

    this.getReparationPrixFromNode().subscribe(
      (result: any) =>{
       console.log(result);
       this.prixReparation=result;
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

}
