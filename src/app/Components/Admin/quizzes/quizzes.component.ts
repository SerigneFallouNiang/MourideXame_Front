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

//   deleteQuestion(questionId: string | undefined): void {
//     if (questionId) {  // Vérifiez si l'ID n'est pas undefined
//       if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
//         this.questionService.deleteQuestion(questionId).subscribe({
//           next: () => {
//             this.questions = this.questions.filter(question => question.id?.toString() !== questionId);
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


