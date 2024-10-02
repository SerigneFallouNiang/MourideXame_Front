import { Routes } from '@angular/router';
import { LoginComponent } from './Components/auth/login/login.component';
import { SignupComponent } from './Components/auth/signup/signup.component';
import { AccueilComponent } from './Components/Apprenants/accueil/accueil.component';
import { XassidasListeComponent } from './Components/Apprenants/xassidas-liste/xassidas-liste.component';
import { ReadPDFComponent } from './Components/Apprenants/read-pdf/read-pdf.component';
import { QuizComponent } from './Components/Apprenants/quiz/quiz.component';
import { DashbordComponent } from './Components/Admin/dashbord/dashbord.component';
import { authGuard } from './auth/auth.guard';
import { HistoriqueComponent } from './Components/Apprenants/historique/historique.component';

export const routes: Routes = [

    //Route pour Uesr simple
{path: "", pathMatch: "full", redirectTo: "accueil"},

{path: "login", component : LoginComponent},
{path: "register", component : SignupComponent},
{path: "accueil", component : AccueilComponent},
{path: "lecture", component : ReadPDFComponent},
{path: "quiz", component : QuizComponent},
{path: "historique", component : HistoriqueComponent},
{path: "admin", component : DashbordComponent,canActivate: [authGuard] },
{ path: "category/:id", component: XassidasListeComponent },
{ path: "books/:id", component: ReadPDFComponent },
{ path: "quiz/:id", component: QuizComponent },


// Les routes du dashbord 
{
    path: 'dashboard',
    component: DashbordComponent,
    children: [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: 'dashboard', component: DashbordComponent },
    //   {path: "dashboard-admin", component: DashboardAdminComponent},
    //   { path: 'communes', component: CommunesCrudComponent},
    //   { path: 'communes/:id', component: ListCommuneComponent },
    //   { path: 'populations/:id', component: PopulationComponent }, 
    //   { path: 'projets-admin', component: ProjetsComponent }, 
    //   // { path: 'communes', component: CommunesCrudComponent },
    //   // { path: 'communes/:id', component: ListCommuneComponent }, 
    //   // { path: 'populations/:id', component: PopulationComponent }, 
    //   // { path: 'projets', component: ProjetsComponent }, 
    //    { path: 'villes', component: VillesComponent },
    //   // { path: 'roles', component: RolesComponent },
    //   // Ajoutez d'autres routes enfaliste-projet-mairents ici
    ]
  }

];
