import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


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

  constructor(
    private voitureService:VoitureService,
    private router: Router,
    private modalService: NgbModal
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

  sortie(depot){
    this.voitureService.sortieVoiture(depot).subscribe(
      (response: any) =>{
        //console.log(response);
       this.router.navigate(['/recherche']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
