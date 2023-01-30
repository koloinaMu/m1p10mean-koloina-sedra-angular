import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {DepenseService} from '../services/depense/depense.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent implements OnInit {

  salaire:number;
  loyer:number;
  pieces:number;
  autres:number;

  constructor(
    private localStorage:LocalStorageService,
    private depenseService:DepenseService,
    private router: Router) { }

  ngOnInit(): void {
  }

  depenser(){
    var depenses=[
      { intitule:'salaire',montant:this.salaire },
      { intitule:'loyer',montant:this.loyer },
      { intitule:'pieces',montant:this.pieces },
      { intitule:'autres',montant:this.autres },
    ];
    this.depenseService.depenser(depenses).subscribe(
      (response: any) =>{
       console.log(response);  
          this.router.navigate(['/app/depense']);      
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
