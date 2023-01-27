import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';
import {HttpClient} from '@angular/common/http';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  user:any;
  voitures:any;
  historiques:any[];

  private baseUrl=environment.baseUrl;
  constructor(
    private localStorage:LocalStorageService,
    private voitureService:VoitureService,
    private modalService: NgbModal,
    private http: HttpClient,
  ) { }


  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem("utilisateur"));
       console.log(this.user);
    this.voitureService.voitureClient(this.user).subscribe(
      (response: any) =>{
       console.log(response);
       this.voitures=response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  open(content,voiture) {
    console.log(voiture);
    this.voitureService.historiqueVoiture(voiture).subscribe(
      (response: any) =>{
       console.log(response);
       this.historiques=response;
       this.modalService.open(content,
        { ariaLabelledBy: 'modal-basic-title',windowClass: 'modif' });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );    
    //this.getListe();
    //modalRef.componentInstance.utilModif.mail=mail;
    //modalRef.componentInstance.utilModif.type=type;
  }

}
