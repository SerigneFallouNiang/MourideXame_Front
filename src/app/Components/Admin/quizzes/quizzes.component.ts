import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { CategorieService } from '../../../Services/categorie.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ModelCategorie } from '../../../Models/categorie.model';
import { QuizzesService } from '../../../Services/Admin/quizzes.service';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.css'
})
export class QuizAdminComponent {

  categories: any[] = [];
  messageImage: string = "Aucune image pour ce livre";
  quizzes: any[] = [];

   // Pour stocker les livres de la page actuelle
   pageQuestions: any[] = [];

   // Pagination variables
    currentPage: number = 1;
    itemsPerPage: number = 6;
    totalItems: number = 0;

  constructor(private quizServices: QuizzesService) {}


    ngOnInit(): void {
      console.log("La liste des categorie");
      
      this.fetchQuiz();
    }


  fetchQuiz() {
    this.quizServices.getAllQuiz().subscribe(
      (data: any) => {
        console.log('Réponse de l\'API:', data);
        // Récupération de la propriété 'Livres' de la réponse
        this.quizzes = data.data || [];

         // récuoération du nombre de page
         this.totalItems = this.quizzes.length;

         // appel à la fonction de pagination
         this.applyPagination();
      },
      error => {
        console.error('Erreur lors de la récupération des livres:', error);
      }
    );
  }

//   deleteQuiz(quizId: string | undefined): void {
//     if (quizId) {  // Vérifiez si l'ID n'est pas undefined
//       if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
//         this.quizServices.deleteQuiz(quizId).subscribe({
//           next: () => {
//             this.quizzes = this.quizzes.filter(question => question.id?.toString() !== quizId);
//             console.log('Quiz supprimée avec succès');
//           },
//           error: (err) => {
//             console.error('Erreur lors de la suppression du Quiz :', err);
//           }
//         });
//       }
//     } else {
//       console.error('ID de la Quiz est undefined');
//     }
// }
deleteQuiz(quizId: string | undefined): void {
  if (quizId) {  // Vérifiez si l'ID n'est pas undefined
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.quizServices.deleteQuiz(quizId).subscribe({
        next: () => {
          // Supprimer le quiz localement
          this.quizzes = this.quizzes.filter(question => question.id?.toString() !== quizId);
          console.log('Quiz supprimée avec succès');
          
          // Mettre à jour le nombre total d'items
          this.totalItems = this.quizzes.length;
          
          // Réappliquer la pagination pour mettre à jour l'affichage
          this.applyPagination();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du Quiz :', err);
        }
      });
    }
  } else {
    console.error('ID de la Quiz est undefined');
  }
}


  //les methode de la pagination
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pageQuestions = this.quizzes.slice(startIndex, endIndex);
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


