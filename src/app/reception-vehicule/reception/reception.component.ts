import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  user:any;
  depots:any;
  private baseUrl=environment.baseUrl;

  constructor(private http: HttpClient,
    private router: Router, private localStorage:LocalStorageService, 
    private modalService: NgbModal,private toastr: ToastrService) { }

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
          this.router.navigate(['/app/dans-atelier']);
       },
       (error: HttpErrorResponse) => {
         console.log(error.message);
       }
     )
   }



  public getAllDepotVoitureFromNode() {
    // console.log(utilisateur);
     return this.http.get(this.baseUrl+"les_depots",{responseType:'json'});
   }

  ngOnInit(): void {

    //this.user=JSON.parse(localStorage.getItem("utilisateur"));
    this.getAllDepotVoitureFromNode().subscribe(
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
