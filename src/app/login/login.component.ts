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
   this.type=Number(this.route.snapshot.paramMap.get('type'));
   //console.log(this.route.snapshot.paramMap.get('type'));
   this.utilisateur.type=this.type;
   this.localStore=localStorage;
  }

  connecter(){
    this.utilisateur.type=Number(localStorage.getItem('typeUtilisateur'));
    this.utilisateurService.connecter(this.utilisateur).subscribe(
      (response: any) =>{
       // console.log("REUSSI");
       console.log(response);
       if(response!='null'){
        var user=JSON.parse(response);
        //console.log(user);
         this.utilisateur.mdp='';
         localStorage.setItem('utilisateur', (response));
         localStorage.setItem('typeUtilisateur',this.type.toString());
         if(this.type==0){
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
          if(user.type==0)
            this.router.navigate(['/depot-voiture']);
          else
            this.router.navigate(['/recherche']);            
         }else if(this.type==1){
          this.router.navigate(['/utilisateurs']);
         }else{
          this.router.navigate(['/connexion']);
         }
         //this.router.navigate(['/inscription']);
       }else{
        this.toastr.error('Erreur d\'authentification! Vérifiez vos identifiants.', '', {
           timeOut: 8000,
           enableHtml: true,
           closeButton: true,
           toastClass: "alert alert-danger alert-with-icon",
           positionClass: 'toast-bottom-left'
         });
       }       
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    ); 
  }

  navigate(chemin){
   console.log(this.route.snapshot.paramMap.get('type'));
    var typp=chemin.split('/')[2];
    //console.log((this.localStore.getItem('typeUtilisateur')) | number );
    if(typp!=undefined){
      localStorage.setItem('typeUtilisateur',typp.toString());
      //console.log(Number(localStorage.getItem('typeUtilisateur')));
    }
    this.router.navigate([chemin]);
  }

}
