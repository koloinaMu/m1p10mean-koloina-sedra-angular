import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atelier',
  templateUrl: './atelier.component.html',
  styleUrls: ['./atelier.component.scss']
})
export class AtelierComponent implements OnInit {

  user:any;
  voiture:any;

  constructor(private http: HttpClient, private localStorage:LocalStorageService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listeVoiture_dans_atelier_From_Node().subscribe(
      (response: any) =>{
       console.log(response);
       this.voiture=response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public listeVoiture_dans_atelier_From_Node(){
    return this.http.get("http://localhost:3000/dans_atelier",{responseType:'json'});
  }

  public update_avancement_FromNode(avancement,idReparation,idDepot){
    return this.http.post("http://localhost:3000/modifier_avancement/" +avancement +"/"+ idReparation+ "/" + idDepot ,{responseType:'json'});
  }

  public modifier_avancement(avancement,idReparation,idDepot){
    this.update_avancement_FromNode(avancement,idReparation,idDepot).subscribe(
      (response: any) =>{
         console.log("REUSSI");
         alert("avancement modifie avec succes")
         //console.log(response);
       //this.router.navigate(['/utilisateurs']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  open(content) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title',windowClass: 'modif' });


    //modalRef.componentInstance.utilModif.mail=mail;
    //modalRef.componentInstance.utilModif.type=type;
  }


}
