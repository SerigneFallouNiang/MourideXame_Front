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
import { ChapitreAdminComponent } from './Components/Admin/chapitres/chapitres.component';
import { AddChapitresComponent } from './Components/Admin/addChapitre/addChapitre.component';
import { UtilisateurComponent } from './Components/Admin/Utilisateurs/utilisateurs.component';
import { QuizAdminComponent } from './Components/Admin/quizzes/quizzes.component';
import { AddQuizComponent } from './Components/Admin/addQuiz/add-quiz.component';
import { RoleUserComponent } from './Components/Admin/rolesUser/roleUser.component';
import { AddUserRoleComponent } from './Components/Admin/addUserRole/add-user-role.component';
// import { RoleUserComponent } from './Components/Admin/roleUser.component';

export const routes: Routes = [

    //Route pour Uesr simple
{path: "", pathMatch: "full", redirectTo: "accueil"},

// {path: "sidebar", component : SidebarAdminComponent},
{path: "login", component : LoginComponent},
{path: "register", component : SignupComponent},
{path: "accueil", component : AccueilComponent},
{path: "lecture", component : ReadPDFComponent},
// {path: "quiz", component : QuizComponent},
{path: "historique", component : HistoriqueComponent},
{path: "admin", component : DashbordComponent,canActivate: [authGuard] },
{ path: "category/:id", component: XassidasListeComponent },
{ path: "books/:id", component: ReadPDFComponent },
{ path: "quiz/:id", component: QuizComponent },


  // Les routes du dashbord 
{
  path: '',
  component: SidebarAdminComponent,
  children: [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: "roles", component : RoleUserComponent,canActivate: [authGuard]},
    {path: "add-roles", component : AddUserRoleComponent,canActivate: [authGuard]},
    {path: "rolesEdit/:id", component : AddUserRoleComponent,canActivate: [authGuard]},
    // {path: "categorieEdit: id", component : AddRolesComponent},
    { path: 'categorieEdit/:id', component: AddRolesComponent,canActivate: [authGuard] },
    { path: 'ajouterCategorie', component: AddRolesComponent ,canActivate: [authGuard]},
    {path: "categories", component : CategoriesComponent ,canActivate: [authGuard]},
    // livres 
    {path: "livres", component : LivreAdminComponent ,canActivate: [authGuard]},
    {path: "add-livre", component : AddLivresComponent ,canActivate: [authGuard]},
    { path: 'livreEdit/:id', component: AddLivresComponent ,canActivate: [authGuard]},
    // questions 
    {path: "questions", component : QuestionComponent ,canActivate: [authGuard]},
    {path: "add-questions", component : AddQuestionsComponent ,canActivate: [authGuard]},
    {path: 'questionEdit/:id', component : AddQuestionsComponent ,canActivate: [authGuard]},
    // chapitres 
    {path: "chapitres", component : ChapitreAdminComponent ,canActivate: [authGuard]},
    {path: "add-chapitres", component : AddChapitresComponent ,canActivate: [authGuard]},
    {path: 'chapitreEdit/:id', component : AddChapitresComponent ,canActivate: [authGuard]},
    // gestion utilisateurs 
    {path: "utilisateurs", component : UtilisateurComponent ,canActivate: [authGuard]},
    //listes quizzes
    {path: "quiz-admin", component : QuizAdminComponent ,canActivate: [authGuard]},
    {path: "add-quiz", component : AddQuizComponent ,canActivate: [authGuard]},
    {path: 'quizEdit/:id', component : AddQuizComponent ,canActivate: [authGuard]},
    //dashbord Admin
    {path: 'dashbord-admin', component : DashbordComponent ,canActivate: [authGuard]},


  ]
}

];
