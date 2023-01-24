import { Routes } from '@angular/router';

import { UtilisateursComponent } from '../../utilisateurs/utilisateurs.component';
import { DepotVoitureComponent } from '../../depot-voiture/depot-voiture.component';
import { ReparationsCourantesComponent } from '../../reparations-courantes/reparations-courantes.component';
import { RechercheComponent } from '../../recherche/recherche.component';
import { StatistiqueComponent } from '../../statistique/statistique.component';
import { MesFacturesComponent } from '../../mes-factures/mes-factures.component';
import { PaiementNonValideComponent } from '../../paiement-non-valide/paiement-non-valide.component';
import { DepenseComponent } from '../../depense/depense.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ListeFactureComponent } from '../../liste-facture/liste-facture/liste-facture.component';
import { ReceptionComponent } from '../../reception-vehicule/reception/reception.component';
import { AtelierComponent } from '../../atelier/atelier.component';
import { HistoriqueComponent } from '../../historique/historique.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'utilisateurs',      component: UtilisateursComponent },
    { path: 'facture',      component: ListeFactureComponent },
    { path: 'depot-voiture',      component: DepotVoitureComponent },
    { path: 'reparations-courantes',      component: ReparationsCourantesComponent },
    { path: 'recherche',      component: RechercheComponent },
    { path: 'statistique',      component: StatistiqueComponent },
    { path: 'mes-factures',      component: MesFacturesComponent },
    { path: 'paiement-non-valide',      component: PaiementNonValideComponent },
    { path: 'depense',      component: DepenseComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'reception',        component: ReceptionComponent },
    { path: 'dans-atelier',        component: AtelierComponent },
    { path: 'historique',        component: HistoriqueComponent },

];
