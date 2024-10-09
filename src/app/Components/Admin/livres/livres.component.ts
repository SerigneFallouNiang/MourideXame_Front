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

  pageBooks: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number = 0;

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
        this.books = data.Livres || [];
        this.totalItems = this.books.length;
        this.applyPagination();

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

  deleteBook(livreId: string | undefined): void {
    if (livreId) {  // Vérifiez si l'ID n'est pas undefined
      if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
        this.bookService.deleteBook(livreId).subscribe({
          next: () => {
            this.books = this.books.filter(livre => livre.id?.toString() !== livreId);
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



//pagination
applyPagination() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.pageBooks = this.books.slice(startIndex, endIndex);
}

get totalPages(): number {
  return Math.ceil(this.totalItems / this.itemsPerPage);
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.applyPagination();
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.applyPagination();
  }
}
}