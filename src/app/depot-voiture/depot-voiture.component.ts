import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Voiture} from '../objets/Voiture';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';

@Component({
  selector: 'app-depot-voiture',
  templateUrl: './depot-voiture.component.html',
  styleUrls: ['./depot-voiture.component.scss']
})
export class DepotVoitureComponent implements OnInit {

  voiture:Voiture={
    id:'',
    immatriculation:'',
    couleur:''
  };
  options:string[];
  user:any;

  constructor(
    private localStorage:LocalStorageService,
    private voitureService:VoitureService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("utilisateur"));
    this.voiture.immatriculation=this.user.voiture.immatriculation;
    this.voiture.couleur=this.user.voiture.couleur;
    this.options = [
       'Rouge',
       'Noir',
       'Gris',
       'Blanc'
    ];
  }

  deposer(){
    var depot={
      utilisateur:this.user,
      voiture:this.voiture
    };
    console.log(this.voiture.immatriculation+" de couleur "+this.voiture.couleur);
    console.log(this.user);
    this.voitureService.deposer(depot).subscribe(
      (response: any) =>{
       console.log(response);  
          this.router.navigate(['/reparations-courantes']);      
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
