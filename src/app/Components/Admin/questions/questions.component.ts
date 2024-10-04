import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../Services/book.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { QuestionssService } from '../../../Services/Admin/questions.service';

@Component({
  selector: 'app-livres',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionComponent implements OnInit {
  messageImage: string = "Aucune image pour ce livre";
  questions: any[] = [];

  constructor(private questionService: QuestionssService) {}

  ngOnInit(): void {
    console.log("Chargement de la liste des livres");
    this.fetchLivre();
  }

  fetchLivre() {
    this.questionService.getAllQuestions().subscribe(
      (data: any) => {
        console.log('Réponse de l\'API:', data);
        // Récupération de la propriété 'Livres' de la réponse
        this.questions = data || [];
      },
      error => {
        console.error('Erreur lors de la récupération des livres:', error);
      }
    );
  }

//   deleteBook(livreId: string | undefined): void {
//     if (livreId) {  // Vérifiez si l'ID n'est pas undefined
//       if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
//         this.bookService.deleteBook(livreId).subscribe({
//           next: () => {
//             this.books = this.books.filter(livre => livre.id?.toString() !== livreId);
//             console.log('Catégorie supprimée avec succès');
//           },
//           error: (err) => {
//             console.error('Erreur lors de la suppression de la catégorie :', err);
//           }
//         });
//       }
//     } else {
//       console.error('ID de la catégorie est undefined');
//     }
// }
}