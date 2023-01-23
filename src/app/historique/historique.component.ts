import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';
import {HttpClient} from '@angular/common/http';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  user:any;
  depots:any;
  constructor(
    private localStorage:LocalStorageService,
    private voitureService:VoitureService,
    private modalService: NgbModal,
    private http: HttpClient,
  ) { }

public getReparationsCourantesUtilisateur(user){
  return this.http.post("http://localhost:3000/reparations-courantes",user,{responseType:'json'});
}

public recuperer_voiture_From_Node(id_depot){
  return this.http.post("http://localhost:3000/recuperer_voiture/"+id_depot,{responseType:'json'});

}

public recuperer_voiture(id){
  this.recuperer_voiture_From_Node(id).subscribe(
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

  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem("utilisateur"));
    this.getReparationsCourantesUtilisateur(this.user).subscribe(
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
    //this.getListe();
    //modalRef.componentInstance.utilModif.mail=mail;
    //modalRef.componentInstance.utilModif.type=type;
  }

}
