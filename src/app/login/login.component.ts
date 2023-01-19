import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Utilisateur} from '../objets/Utilisateur';
import {UtilisateurService} from '../services/utilisateur/utilisateur.service';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  //providers:[UtilisateurService]
})
export class LoginComponent implements OnInit {

  utilisateur:Utilisateur={
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

  constructor(
    private router: Router,
    private utilisateurService:UtilisateurService,
    private localStorage:LocalStorageService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
   // console.log("UTILISATEUR");
   // console.log(typeof this.utilisateur);
   this.type=Number(this.route.snapshot.paramMap.get('type'));
   //console.log(this.route.snapshot.paramMap.get('type'));
   this.utilisateur.type=this.type;
  }

  connecter(){
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
         if(this.type==0){
          console.log("type 0");
          //localStorage.setItem('typeUtilisateur',this.type.toString());
          localStorage.setItem('typeUtilisateur',user.type.toString());
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
       }       
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    ); 
  }

}
