import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/app/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/app/icons', title: 'Icons',  icon:'education_atom', class: '' },
    { path: '/app/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/app/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },

    { path: '/app/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/app/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/app/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    { path: '/app/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }

];

export const routesSuperAdmin: RouteInfo[] = [
    { path: '/app/utilisateurs', title: 'Utilisateurs',  icon: 'users_single-02', class: '' },
    { path: '/app/statistique', title: 'Statistique',  icon: 'business_chart-bar-32', class: '' },
    { path: '/app/paiement-non-valide', title: 'Paiement non validé',  icon: 'business_money-coins', class: '' },
    { path: '/app/depense', title: 'Dépense',  icon: 'business_money-coins', class: '' }
    
];

export const routesClient: RouteInfo[] = [
    { path: '/app/depot-voiture', title: 'Déposer ma voiture',  icon: 'shopping_delivery-fast', class: '' },
    { path: '/app/reparations-courantes', title: 'Mes réparations',  icon: 'ui-2_settings-90', class: '' },
    { path: '/app/mes-factures', title: 'Mes factures',  icon: 'business_money-coins', class: '' },
    { path: '/app/historique', title: 'Historique',  icon: 'users_single-02', class: '' }
    
];

export const routesAtelier: RouteInfo[] = [
    { path: '/app/recherche', title: 'Recherche',  icon: 'ui-1_zoom-bold', class: '' },
    { path: '/app/reception', title: 'Reception Vehicule',  icon: 'ui-2_settings-90', class: '' },
    { path: '/app/dans-atelier', title: 'Atelier',  icon: 'ui-2_settings-90', class: '' },
    { path: '/app/piece', title: 'piece',  icon: 'users_single-02', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private localStorage:LocalStorageService
  ) { }

  ngOnInit() {
    //this.menuItems = ROUTES.filter(menuItem => menuItem);
    var type=(Number)(localStorage.getItem('typeUtilisateur'));
    if(type==0){
      this.menuItems = routesClient.filter(menuItem => menuItem);
    }else if(type==1){
      this.menuItems = routesSuperAdmin.filter(menuItem => menuItem);
    }else if(type==2){
      this.menuItems = routesAtelier.filter(menuItem => menuItem);
    }
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
