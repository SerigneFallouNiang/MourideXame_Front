import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../Services/book.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';

@Component({
  selector: 'app-livres',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivreAdminComponent implements OnInit {
  messageImage: string = "Aucune image pour ce livre";
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    console.log("Chargement de la liste des livres");
    this.fetchLivre();
  }

  fetchLivre() {
    this.bookService.getAllBooks().subscribe(
      (data: any) => {
        console.log('Réponse de l\'API:', data);
        // Récupération de la propriété 'Livres' de la réponse
        this.books = data.Livres || []; // Utilise la clé 'Livres' retournée par l'API
        // Met à jour l'URL de l'image pour chaque livre
        this.books.forEach(livre => {
          if (livre.image) {
            livre.image = `${apiUrlStockage}/${livre.image}`;
          } else {
            livre.image = this.messageImage; // Assigner un message si pas d'image
          }
        });
      },
      error => {
        console.error('Erreur lors de la récupération des livres:', error);
      }
    );
  }

  deleteLivre(livreId: string | undefined): void {
    if (livreId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
        console.log('Suppression du livre avec l\'ID:', livreId);
        // Implémentez la logique de suppression ici et actualisez la liste
        // this.fetchLivre();
      }
    } else {
      console.error('ID du livre est undefined');
    }
  }
}