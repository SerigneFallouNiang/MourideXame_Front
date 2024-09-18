import { Routes } from '@angular/router';
import { LoginComponent } from './Components/auth/login/login.component';
import { SignupComponent } from './Components/auth/signup/signup.component';
import { AccueilComponent } from './Components/Apprenants/accueil/accueil.component';
import { XassidasListeComponent } from './Components/Apprenants/xassidas-liste/xassidas-liste.component';
import { ReadPDFComponent } from './Components/Apprenants/read-pdf/read-pdf.component';
import { QuizComponent } from './Components/Apprenants/quiz/quiz.component';

export const routes: Routes = [

    //Route pour Uesr simple
{path: "", pathMatch: "full", redirectTo: "accueil"},

{path: "login", component : LoginComponent},
{path: "register", component : SignupComponent},
{path: "accueil", component : AccueilComponent},
{path: "xassidas", component : XassidasListeComponent},
{path: "lecture", component : ReadPDFComponent},
{path: "quiz", component : QuizComponent},

];
