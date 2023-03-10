import { Component, OnInit } from '@angular/core';
//import {Utilisateur} from '../objets/utilisateur';
import {UtilisateurService} from '../services/utilisateur/utilisateur.service';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
  //providers:[UtilisateurService]
})
export class InscriptionComponent implements OnInit {

  options:string[];
  selectedOption:string;
  utilisateur={
    id: '',
    nom: '',
    prenom: '',
    mail: '',
    mdp: '',
    voiture: {
      id: '',
      immatriculation: '',
      couleur: ''
    },
    type:0,
  };;

  constructor(
    private router: Router,
    private utilisateurService:UtilisateurService,
    private localStorage:LocalStorageService,
    private toastr: ToastrService) {    
  }

  ngOnInit(): void {
    this.options = [
       'Rouge',
       'Noir',
       'Gris',
       'Blanc'
    ];
    this.selectedOption = 'Couleur';
    console.log(this.selectedOption);
    this.utilisateur={
      id:'',
      nom:'',
      prenom:'',
      mail:'',
      mdp:'',
      voiture:{
        id:'',
        immatriculation:'',
        couleur:''
      },
      type:0
    }
  }

  selectCouleur(couleur){
    this.selectedOption=couleur;
    this.utilisateur.voiture.couleur=couleur;
  }

  inscrire(){
    console.log(this.utilisateur);
    this.utilisateurService.insert(this.utilisateur).subscribe(
      (response: any) =>{   
       //localStorage.setItem('utilisateur', JSON.stringify(response));
       localStorage.setItem('utilisateur', JSON.stringify(this.utilisateur) );
       localStorage.setItem('typeUtilisateur', this.utilisateur.type.toString());
       this.toastr.info('Votre demande d\'inscription a bien été reçue, vous recevrez un mail quand elle sera validée.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-info alert-with-icon",
           positionClass: 'toast-bottom-left'
         });
       this.router.navigate(['/connexion/0']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    ); 
  }

  navigate(chemin){
    this.router.navigate([chemin]);
  }

}
