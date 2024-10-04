import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../Services/book.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ChapitreService } from '../../../Services/chapitre.service';

@Component({
  selector: 'app-livres',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chapitres.component.html',
  styleUrls: ['./chapitres.component.css']
})
export class ChapitreAdminComponent implements OnInit {
  messageImage: string = "Aucune image pour ce livre";
  chapitres: any[] = [];

  constructor(private chapitreService: ChapitreService) {}

  ngOnInit(): void {
    console.log("Chargement de la liste des livres");
    this.fetchLivre();
  }

  fetchLivre() {
    this.chapitreService.getAllChapters().subscribe(
      (data: any) => {
        console.log('Réponse de l\'API:', data);
        // Récupération de la propriété 'Livres' de la réponse
        this.chapitres = data.Chapitre || []; // Utilise la clé 'Livres' retournée par l'API
        // Met à jour l'URL de l'image pour chaque livre
        this.chapitres.forEach(chapitre => {
          if (chapitre.video) {
            chapitre.video = `${apiUrlStockage}/${chapitre.image}`;
          } else {
            chapitre.video = this.messageImage; // Assigner un message si pas d'image
          }
        });
      },
      error => {
        console.error('Erreur lors de la récupération des livres:', error);
      }
    );
  }

  deleteChapitre(livreId: string | undefined): void {
    if (livreId) {  // Vérifiez si l'ID n'est pas undefined
      if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
        this.chapitreService.deleteChapitre(livreId).subscribe({
          next: () => {
            this.chapitres = this.chapitres.filter(livre => livre.id?.toString() !== livreId);
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