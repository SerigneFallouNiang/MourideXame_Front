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
import { SidebarAdminComponent } from './Components/heritage/sidebar-admin/sidebar-admin.component';
import { Role } from './Components/Admin/roles/roles.component';
import { AddRolesComponent } from './Components/Admin/add-roles/add-roles.component';
import { CategoriesComponent } from './Components/Admin/categories/categories.component';
import { LivreAdminComponent } from './Components/Admin/livres/livres.component';
import { AddLivresComponent } from './Components/Admin/addLivre/addLivre.component';
import { QuestionComponent } from './Components/Admin/questions/questions.component';
import { AddQuestionsComponent } from './Components/Admin/addQuestion/addQuestion.component';

export const routes: Routes = [

    //Route pour Uesr simple
{path: "", pathMatch: "full", redirectTo: "accueil"},

// {path: "sidebar", component : SidebarAdminComponent},
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
// {
//     path: 'dashboard',
//     component: DashbordComponent,
//     children: [
//       // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//     ]
//   },


  // Les routes du dashbord 
{
  path: '',
  component: SidebarAdminComponent,
  children: [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: "roles", component : Role},
    // {path: "categorieEdit: id", component : AddRolesComponent},
    { path: 'categorieEdit/:id', component: AddRolesComponent },
    { path: 'ajouterCategorie', component: AddRolesComponent },
    {path: "categories", component : CategoriesComponent},
    // livres 
    {path: "livres", component : LivreAdminComponent},
    {path: "add-livre", component : AddLivresComponent},
    { path: 'livreEdit/:id', component: AddLivresComponent },
    // questions 
    {path: "questions", component : QuestionComponent},
    {path: "add-questions", component : AddQuestionsComponent},
  ]
}

];
