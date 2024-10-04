import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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

   // Pour stocker les livres de la page actuelle
   pageQuestions: any[] = [];

   // Pagination variables
    currentPage: number = 1;
    itemsPerPage: number = 6;
    totalItems: number = 0;

  constructor(private questionService: QuestionssService) {}

  ngOnInit(): void {
    console.log("Chargement de la liste des livres");
    this.fetchQuestion();
  }

  fetchQuestion() {
    this.questionService.getAllQuestions().subscribe(
      (data: any) => {
        console.log('Réponse de l\'API:', data);
        // Récupération de la propriété 'Livres' de la réponse
        this.questions = data || [];

         // récuoération du nombre de page
         this.totalItems = this.questions.length;

         // appel à la fonction de pagination
         this.applyPagination();
      },
      error => {
        console.error('Erreur lors de la récupération des livres:', error);
      }
    );
  }

  deleteQuestion(questionId: string | undefined): void {
    if (questionId) {  // Vérifiez si l'ID n'est pas undefined
      if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
        this.questionService.deleteQuestion(questionId).subscribe({
          next: () => {
            this.questions = this.questions.filter(question => question.id?.toString() !== questionId);
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


  //les methode de la pagination
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pageQuestions = this.questions.slice(startIndex, endIndex);
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