import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {

  constructor(
    private localStorage:LocalStorageService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    var user=localStorage.getItem("utilisateur");
    var url=state.url;
    const routesSuperAdmin=["/utilisateurs","/recherche"];
    const routesClient=["/depot-voiture","/reparations-courantes","/icons"];
    const routesAtelier=["/recherche"];
    if(user){
      var type=(Number)(localStorage.getItem("typeUtilisateur"));  
      //console.log(type) ;
      //console.log(url in routesClient) ;
      //console.log( routesClient.includes(url)) ;
      if(type==0 && routesClient.includes(url)){
        return true;
      }else if(type==1 && routesSuperAdmin.includes(url)){
        return true;
      }else if(type==2 && routesAtelier.includes(url)){
        return true;
      }else{
        this.router.navigate(['/connexion']);
        return false;
      }
    }
    return false;
  }

  
}
