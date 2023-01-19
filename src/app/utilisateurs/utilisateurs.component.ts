import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from '../services/utilisateur/utilisateur.service';
import {Utilisateur} from '../objets/Utilisateur';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

  utilisateurs:Utilisateur[];
  utilModif={
    mail:"124@gmail.com",
    type:0
  };
  closeResult = '';

  constructor(
    private router: Router,
    private utilisateurService:UtilisateurService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.utilModif.mail="";
    //document.getElementById("mailModif").value="124@gmail.com";
    this.utilModif.type=0;
    this.utilisateurService.getAll().subscribe(
      (response: any) =>{
       // console.log("REUSSI");
      // console.log(response);   
       this.utilisateurs=response;  
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  open(content,mail,type) {
    const modalRef= <NgbModalRef> this.modalService.open(content, 
      { ariaLabelledBy: 'modal-basic-title',windowClass: 'modif' });
    this.utilModif.mail=mail;
    this.utilModif.type=type;
    //modalRef.componentInstance.utilModif.mail=mail;
    //modalRef.componentInstance.utilModif.type=type;
  }

  modifier(user){
    user.type=this.utilModif.type;
   // console.log("modif "+this.utilModif.mail+" to type "+this.utilModif.type);
    this.utilisateurService.update(user).subscribe(
      (response: any) =>{
       // console.log("REUSSI");
      // console.log(response);
       this.router.navigate(['/utilisateurs']);      
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

}
