import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from 'express';
import { UserModel } from '../../../Models/user.model';
import { AlertShowMessage } from '../../../Services/alretMessage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //  // Injection de dependances 
  //  private authService = inject(AuthService);
  //  private router = inject(Router);
 
  //  // Declaration des variables 
  //  userObject: UserModel = {}; // un objet qui a pour type UserModel qui se trouve dans Models/user.model.ts
  //  alertMessage: string = ""; // cette variable permettra de stocker la valeur de l'alerte
 
 
  //  // Declaration des methodes 
  //  login(){
  //    console.log(this.userObject);
  //    if(!this.userObject.email || !this.userObject.password){
  //      this.alertMessage = "L'email et le mot de passe sont obligatoires"
  //      // On importe la methode AlertShowMessage qui se trouve dans le dossier Services avant de l'utiliser
  //      AlertShowMessage("alert-danger");
  //    }
  //    else{  
  //      this.authService.login(this.userObject).subscribe(
  //        (response:any) =>{
  //          // console.log(response); 
  //          if(response.success){
  //            // Enregistrement du token et des insfos de l'utilisateur dans le localstorage 
  //            localStorage.setItem("infos_Connexion", JSON.stringify(response));
 
  //            // Redirection de l'utilisateur connecté vers la page lui concernant 
  //            const user = response.user;
  //            // console.log(user);            
  //            if(user.role === "admin"){
  //              this.router.navigateByUrl("/accuelMembre") // On les membres vers leur page d'accueil
  //            } else {
  //              this.router.navigateByUrl("/livres") // On redirige l'admin ou le personnel vers la liste des membres
 
  //            }
  //          }       
  //        },
  //        (error) =>{
  //          console.log("les erreurs");
  //          console.log(error.error.message);
  //          this.alertMessage = error.error.message;
  //          AlertShowMessage("alert-danger");
 
  //        }
  //      )
 
  //    }
     
  //  }
 
  
}
