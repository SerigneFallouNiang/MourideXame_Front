import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { UserModel } from '../../../Models/user.model';
import { CategorieService } from '../../../Services/categorie.service';
import { ModelCategorie } from '../../../Models/categorie.model';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar-apprenant',
  standalone: true,
  imports: [CommonModule, FormsModule,TranslateModule, RouterModule],
  templateUrl: './navbar-apprenant.component.html',
  styleUrl: './navbar-apprenant.component.css'
})
export class NavbarApprenantComponent {


tabCategorie: ModelCategorie[] = [];
  messageImage: string = "Aucune image pour cette catégorie";
  loading: boolean = true;
  error: string | null = null;
 userConnected: UserModel | null = null;
  
  showEditProfileModal: boolean = false;


  constructor(
    private categorieService: CategorieService,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {
  }

 // Add this method to check if a route is active
 isRouteActive(route: string): boolean {
  return this.router.isActive(route, true);
}


  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit(): void {
    this.fetchCategorie();
    this.loadUserInfo();
  }
// Ouvrir le modal de modification du profil
openEditProfileModal() {
  this.showEditProfileModal = true;
}

// Fermer le modal de modification du profil
closeEditProfileModal() {
  this.showEditProfileModal = false;
}


  // Charger les informations de l'utilisateur
  loadUserInfo() {
  if (typeof window !== 'undefined' && localStorage.getItem('authUser')) {
    const infos = JSON.parse(localStorage.getItem('authUser') || "{}");
    if (infos && infos.user) {
      this.userConnected = infos.user;
      this.useLanguage(this.userConnected?.locale!);
    } else {
      this.userConnected = null;
    }
  } else {
    this.userConnected = null;
  }
  }



updateProfile() {
  if (this.userConnected) {
    const formData = new FormData();
    if (this.userConnected.name) {
      formData.append('name', this.userConnected.name);
    }
    if (this.userConnected.email) {
      formData.append('email', this.userConnected.email);
    }
    if (this.userConnected.telephone) {
      formData.append('telephone', this.userConnected.telephone);
    }
    if (this.userConnected.locale) {
      formData.append('locale', this.userConnected.locale);
    }

    this.authService.updateProfile(formData).subscribe(
      (response) => {
        console.log('Profil mis à jour avec succès');

        // Récupérer les informations existantes dans localStorage
        const currentAuthUser = JSON.parse(localStorage.getItem("authUser") || "{}");

        // Mettre à jour uniquement la partie utilisateur
        currentAuthUser.user = this.userConnected;

        // Remettre à jour l'objet dans le localStorage
        localStorage.setItem("authUser", JSON.stringify(currentAuthUser));

        this.closeEditProfileModal();
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du profil", error);
      }
    );
  }
}



  fetchCategorie() {
    this.loading = true;
    this.error = null;
    this.categorieService.getAllCategorie().subscribe(
      (response: any) => {
        if (response['Catégorie']) {
          this.tabCategorie = response['Catégorie'].reverse();
          this.tabCategorie.forEach(categorie => {
            if (categorie.image) {
              categorie.image = `${apiUrlStockage}/${categorie.image}`;
            }
          });
        } else {
          this.error = 'Aucune catégorie trouvée dans la réponse.';
        }
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
        this.error = 'Erreur lors de la récupération des catégories. Veuillez réessayer.';
        this.loading = false;
      }
    );
  }

  //Fonction pour la selection par categorie
  onCategoryClick(categoryId: number | string): void {
    const idAsString = categoryId.toString();
    this.router.navigate(['/category', idAsString]);
  }

  trackByCategorieId(index: number, categorie: ModelCategorie): number {
    return categorie.id!;
  }
  

//Fonction de la déconnexion
logout() {
  this.authService.logout();
  localStorage.removeItem("authUser");
  this.userConnected = {
    name: '',
    email: '',
    telephone: '',
    locale: ''
  };
  this.router.navigateByUrl("/login");
}


  //fonction pour la modification du profil utilisateur
  editProfile() {
    // Naviguer vers la page de modification du profil
    this.router.navigateByUrl("/edit-profile");
  }
//fonctio poir la redirection vers la page de connexion
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  //fonctio poir la redirection vers la page d'accueil
  navigateToAccueil() {
    this.router.navigate(['/accueil']);
  }

   //fonctio poir la redirection vers la page historique
  //  navigateToHistorique() {
  //   this.router.navigate(['/historique']);
  // }
}
