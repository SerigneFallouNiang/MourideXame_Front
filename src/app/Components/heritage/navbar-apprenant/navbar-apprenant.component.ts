import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { UserModel } from '../../../Models/user.model';
import { CategorieService } from '../../../Services/categorie.service';
import { ModelCategorie } from '../../../Models/categorie.model';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-apprenant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-apprenant.component.html',
  styleUrl: './navbar-apprenant.component.css'
})
export class NavbarApprenantComponent {


tabCategorie: ModelCategorie[] = [];
  messageImage: string = "Aucune image pour cette catégorie";
  loading: boolean = true;
  error: string | null = null;
  userConnected: UserModel | null = null;

  isBrowser: boolean;


  constructor(
    private categorieService: CategorieService,
    private router: Router,
    private authService: AuthService
  ) {
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  ngOnInit(): void {
    this.fetchCategorie();
    this.loadUserInfo();
  }



  loadUserInfo() {
    if (this.isBrowser) {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      this.userConnected = JSON.parse(authUser).user;
    } else {
      this.authService.getProfile().subscribe(
        (user: UserModel) => {
          this.userConnected = user;
          localStorage.setItem("authUser", JSON.stringify({ user }));
        },
        error => {
          console.error("Erreur lors de la récupération des informations de l'utilisateur", error);
        }
      );
    }
  }else {
    console.warn('localStorage n\'est pas disponible.');
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
    this.userConnected = null;
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
}
