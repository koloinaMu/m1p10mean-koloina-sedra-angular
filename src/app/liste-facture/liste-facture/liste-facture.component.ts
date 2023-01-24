import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { data } from 'jquery';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-liste-facture',
  templateUrl: './liste-facture.component.html',
  styleUrls: ['./liste-facture.component.scss']
})
export class ListeFactureComponent implements OnInit {

    public getJsonValue: any;
    user:any;
    depots:any;
  //apicall= "http://localhost:3000/select_reparation";

  /*


  */
    constructor(private http: HttpClient, private localStorage:LocalStorageService, private modalService: NgbModal) {

    }

    public getFactureFromNode(mail) {
      // console.log(utilisateur);
       return this.http.post("http://localhost:3000/facturation",mail,{responseType:'json'});
     }

    public getListe() {
      this.user=JSON.parse(localStorage.getItem("utilisateur"));
      console.log("nom: "+this.user.mail);
      this.getFactureFromNode(this.user.mail).subscribe(
      (response: any) =>{
       console.log(response);
       this.depots=response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }
  ngOnInit(): void {
   this.getListe();
 }

 open(content) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title',windowClass: 'modif' });
    this.getListe();
    //modalRef.componentInstance.utilModif.mail=mail;
    //modalRef.componentInstance.utilModif.type=type;
  }

}
