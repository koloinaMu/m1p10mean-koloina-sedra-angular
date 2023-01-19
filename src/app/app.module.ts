import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { DepotVoitureComponent } from './depot-voiture/depot-voiture.component';
import { ReparationsCourantesComponent } from './reparations-courantes/reparations-courantes.component';
import { RechercheComponent } from './recherche/recherche.component';
//import { UtilisateurService } from './services/utilisateur/utilisateur.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    InscriptionComponent,
    LoginComponent,
    UtilisateursComponent,
    DepotVoitureComponent,
    ReparationsCourantesComponent,
    RechercheComponent

  ],
  providers: [
    //UtilisateurService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
