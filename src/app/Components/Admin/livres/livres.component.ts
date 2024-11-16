import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../Services/book.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import Swal from 'sweetalert2';

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
  if (!livreId) {
    console.error('ID du livre est undefined');
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
      this.bookService.deleteBook(livreId).subscribe({
        next: () => {
          this.books = this.books.filter(livre => livre.id?.toString() !== livreId);
          this.totalItems = this.books.length;
          this.applyPagination();
          Swal.fire('Supprimé !', 'Le livre a été supprimé avec succès.', 'success');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du livre :', err);
          Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
        }
      });
    } else {
      console.log('Suppression annulée par l\'utilisateur');
    }
  });
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