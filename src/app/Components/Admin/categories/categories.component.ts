import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategorieService } from '../../../Services/categorie.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ModelCategorie } from '../../../Models/categorie.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  categories: any[] = [];


  constructor(private categorieService: CategorieService) {}

  // ngOnInit(): void {
  //   this.loadRoles(); // Charger les rôles de la page actuelle
  // }

  // loadRoles(): void {
  //   this.categorieService.getCategorieAdmin().subscribe((data: any) => {
  //     this.categories = data;
  //     console.log(data)
  //   });
  // }


    // Declaration des variables 
    tabCategorie:ModelCategorie[] = [];
    categorieObject:ModelCategorie = {};

    image:string = "";
  imageLivre:string = "";
  messageImage: string = "Aucune image pour ce categorie";



    ngOnInit(): void {
      console.log("La liste des categorie");
      
      this.fetchCategorie();
    }

      // Recuperation de toutes les categorie

  fetchCategorie() {
  console.log('Tentative de récupération des catégories...');
  this.categorieService.getAllCategorie().subscribe(
    (response: any) => {
      console.log('Réponse de l\'API:', response);
      if (response['Catégorie']) {
        this.tabCategorie = response['Catégorie'].reverse();
  
        // Met à jour l'URL de l'image pour chaque catégorie
        this.tabCategorie.forEach(categorie => {
          if (categorie.image) {
            categorie.image = `${apiUrlStockage}/${categorie.image}`;
          } else {
            this.messageImage = "Aucune image pour cette catégorie";
          }
        });
  
        console.log('Catégories:', this.tabCategorie);
  
      } else {
        console.log('Aucune catégorie trouvée dans la réponse.');
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  );
}


deletecategorie(categoryId: string | undefined): void {
  if (categoryId) {  // Vérifiez si l'ID n'est pas undefined
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.categorieService.deleteCategorie(categoryId).subscribe({
        next: () => {
          this.tabCategorie = this.tabCategorie.filter(categorie => categorie.id?.toString() !== categoryId);
          console.log('Catégorie supprimée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la catégorie :', err);
        }
      });
    }
  } else {
    console.error('ID de la catégorie est undefined');
  }
}



}


