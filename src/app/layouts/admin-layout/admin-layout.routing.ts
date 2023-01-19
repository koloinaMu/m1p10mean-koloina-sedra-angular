import { Routes } from '@angular/router';

import { UtilisateursComponent } from '../../utilisateurs/utilisateurs.component';
import { DepotVoitureComponent } from '../../depot-voiture/depot-voiture.component';
import { ReparationsCourantesComponent } from '../../reparations-courantes/reparations-courantes.component';
import { RechercheComponent } from '../../recherche/recherche.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'utilisateurs',      component: UtilisateursComponent },
    { path: 'depot-voiture',      component: DepotVoitureComponent },
    { path: 'reparations-courantes',      component: ReparationsCourantesComponent },
    { path: 'recherche',      component: RechercheComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
