import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../../../Services/categorie.service';
import { ModelCategorie } from '../../../Models/categorie.model';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { CommonModule } from '@angular/common';
import { NavbarApprenantComponent } from '../../heritage/navbar-apprenant/navbar-apprenant.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule,CommonModule,NavbarApprenantComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit{

  // Injection de dependance 
  private categorieService = inject(CategorieService);



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


  
}
