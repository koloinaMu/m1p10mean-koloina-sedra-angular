import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {Utilisateur} from '../objets/Utilisateur';
import {UtilisateurService} from '../services/utilisateur/utilisateur.service';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  //providers:[UtilisateurService]
})
export class LoginComponent implements OnInit {

  utilisateur={
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
  };
  type:number;
  localStore:any;

  constructor(
    private router: Router,
    private utilisateurService:UtilisateurService,
    private localStorage:LocalStorageService,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
   // console.log("UTILISATEUR");
   // console.log(typeof this.utilisateur);
   this.localStore=localStorage;
   this.type=Number(this.route.snapshot.paramMap.get('type'));
   localStorage.setItem('typeUtilisateur',this.type.toString());
   //console.log(this.route.snapshot.paramMap.get('type'));
   this.utilisateur.type=this.type;
   console.log(this.type);
   if(this.utilisateur.type==0){
    this.utilisateur.mail='rabenjako@gmail.com';
    this.utilisateur.mdp='koloina';
   }else if(this.utilisateur.type==1){
    this.utilisateur.mail='superAdmin@gmail.com';
    this.utilisateur.mdp='superAdmin';
   }else if(this.utilisateur.type==2){
    var nb=0;
   //localStorage.setItem('typeUtilisateur',nb.toString());
    this.utilisateur.mail='atelier@gmail.com';
    this.utilisateur.mdp='atelier';
   }
  }

  connecter(){
    this.utilisateur.type=Number(localStorage.getItem('typeUtilisateur'));
    this.utilisateurService.connecter(this.utilisateur).subscribe(
      (response: any) =>{
       // console.log("REUSSI");
       //console.log(response);
       if(response!='null'){
        var user=JSON.parse(response);
        //console.log(user);
         this.utilisateur.mdp='';
         localStorage.setItem('utilisateur', (response));
         localStorage.setItem('typeUtilisateur',this.type.toString());
         console.log("type local="+this.type);
         if(this.type==0 || this.type==1 || this.type==2){
          console.log("type 0");
          //localStorage.setItem('typeUtilisateur',this.type.toString());
          localStorage.setItem('typeUtilisateur',user.type.toString());
          this.toastr.success('Bienvenue.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-bottom-left' 
         });

    //console.log(user.type==2);
          if(user.type==0){
            this.router.navigate(['/depot-voiture']);
          }
          else if(user.type==2){
            this.router.navigate(['/recherche']);            
          }
         else if(user.type==1){
          this.router.navigate(['/utilisateurs']);
         }}else{
        this.toastr.error('Erreur d\'authentification! Vérifiez vos identifiants.', '', {
           timeOut: 8000,
           enableHtml: true,
           closeButton: true,
           toastClass: "alert alert-danger alert-with-icon",
           positionClass: 'toast-bottom-left'
         });
        }
       }},
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    ); 
  }

  navigate(chemin){
   //console.log(this.route.snapshot.paramMap.get('type'));
    var typp=chemin.split('/')[2];
    //console.log(chemin.split('/'));
    //console.log((this.localStore.getItem('typeUtilisateur')) | number );
    if(typp!=undefined){
      localStorage.setItem('typeUtilisateur',typp.toString());
      //console.log(Number(localStorage.getItem('typeUtilisateur')));
      typp=Number(typp);
      if(typp==0){
        this.utilisateur.mail='rabenjako@gmail.com';
        this.utilisateur.mdp='koloina';
       }else if(typp==1){
        this.utilisateur.mail='superAdmin@gmail.com';
        this.utilisateur.mdp='superAdmin';
       }else if(typp==2){
        var nb=0;
       //localStorage.setItem('typeUtilisateur',nb.toString());
        this.utilisateur.mail='atelier@gmail.com';
        this.utilisateur.mdp='atelier';
       }
    }
    //console.log(chemin);
    this.router.navigate([chemin]);
  }

}
