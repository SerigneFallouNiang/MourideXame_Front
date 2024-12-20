import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategorieService } from '../../../Services/categorie.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ModelCategorie } from '../../../Models/categorie.model';
import Swal from 'sweetalert2';

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
    (error:any) => {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  );
}



deletecategorie(categoryId: string | undefined): void {
  if (!categoryId) {
    console.error('ID de la catégorie est undefined');
    return;
  }

  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Cette action est irréversible !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.categorieService.deleteCategorie(categoryId).subscribe({
        next: () => {
          this.tabCategorie = this.tabCategorie.filter(categorie => categorie.id?.toString() !== categoryId);
          Swal.fire('Supprimé !', 'La catégorie a été supprimée avec succès.', 'success');
        },
        error: (err: any) => {
          console.error('Erreur lors de la suppression de la catégorie :', err);
          Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
        }
      });
    } else {
      console.log('Suppression annulée');
    }
  });
}



}


