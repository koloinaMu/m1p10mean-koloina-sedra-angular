import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-reparations-courantes',
  templateUrl: './reparations-courantes.component.html',
  styleUrls: ['./reparations-courantes.component.scss']
})
export class ReparationsCourantesComponent implements OnInit {

  user:any;
  depots:any;

  constructor(
    private localStorage:LocalStorageService,
    private voitureService:VoitureService,
    private modalService: NgbModal
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

}
