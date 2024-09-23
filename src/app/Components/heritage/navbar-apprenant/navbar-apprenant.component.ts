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
  // private router = inject(Router);
  // private authService = inject(AuthService);

  // // Déclaration des variables 
  // connexionInfos: any;
  // userConnected: UserModel = {};

  // ngOnInit(): void {
  //   this.loadUserInfo();
  // }

  // private loadUserInfo() {
  //   if (localStorage.getItem("authUser")) {
  //     this.connexionInfos = JSON.parse(localStorage.getItem("authUser") || "");
  //     this.userConnected = this.connexionInfos.user;
  //     console.log(this.userConnected);
  //   } else {
  //     this.authService.getProfile().subscribe(
  //       (user: UserModel) => {
  //         this.userConnected = user;
  //         console.log(this.userConnected);
  //         localStorage.setItem("authUser", JSON.stringify({ user })); // Stocke dans localStorage
  //       },
  //       error => {
  //         console.error('Erreur lors de la récupération des informations de l’utilisateur', error);
  //       }
  //     );
  //   }
  // }

  // // Déconnexion
  // logout() {
  //   this.authService.logout();
  //   localStorage.removeItem("authUser");
  //   this.router.navigateByUrl("/connexion");
  // }


  // Injection de dependance 
//   private categorieService = inject(CategorieService);

//   // private router : Router;
//   private router = inject(Router);

//     // Declaration des variables 
//     tabCategorie:ModelCategorie[] = [];
//     categorieObject:ModelCategorie = {};

//     image:string = "";
//   imageLivre:string = "";
//   messageImage: string = "Aucune image pour ce categorie";



//     ngOnInit(): void {
//       console.log("La liste des categorie");
      
//       this.fetchCategorie();
//     }

//       // Recuperation de toutes les categorie

//   fetchCategorie() {
//   console.log('Tentative de récupération des catégories...');
//   this.categorieService.getAllCategorie().subscribe(
//     (response: any) => {
//       console.log('Réponse de l\'API:', response);
//       if (response['Catégorie']) {
//         this.tabCategorie = response['Catégorie'].reverse();
  
//         // Met à jour l'URL de l'image pour chaque catégorie
//         this.tabCategorie.forEach(categorie => {
//           if (categorie.image) {
//             categorie.image = `${apiUrlStockage}/${categorie.image}`;
//           } else {
//             this.messageImage = "Aucune image pour cette catégorie";
//           }
//         });
  
//         console.log('Catégories:', this.tabCategorie);
  
//       } else {
//         console.log('Aucune catégorie trouvée dans la réponse.');
//       }
//     },
//     (error) => {
//       console.error('Erreur lors de la récupération des catégories:', error);
//     }
//   );
// }



// // onCategoryClick(categoryId: numbernumber) {
// //   this.router.navigate(['/category', categoryId]);
// // }

// onCategoryClick(categoryId: number | string ): void {
//   const idAsString = categoryId.toString(); // Convertir en chaîne
//   this.router.navigate(['/category', idAsString]);
// }


tabCategorie: ModelCategorie[] = [];
  messageImage: string = "Aucune image pour cette catégorie";
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCategorie();
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

  onCategoryClick(categoryId: number | string): void {
    const idAsString = categoryId.toString();
    this.router.navigate(['/category', idAsString]);
  }
  trackByCategorieId(index: number, categorie: ModelCategorie): number {
    return categorie.id!;
  }
  
}
