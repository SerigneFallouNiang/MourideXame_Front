import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  pageQuestions: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 0;
  afficherModal: boolean = false;
  quizSelectionne: any = null;

  constructor(private quizServices: QuizzesService) {}

  ngOnInit(): void {
    console.log("La liste des catégories");
    this.fetchQuiz();
  }

  fetchQuiz() {
    this.quizServices.getAllQuiz().subscribe(
      (data: any) => {
        console.log('Réponse de l\'API:', data);
        this.quizzes = data.data || [];
        this.totalItems = this.quizzes.length;
        this.applyPagination();
      },
      error => {
        console.error('Erreur lors de la récupération des quizzes:', error);
      }
    );
  }

  deleteQuiz(quizId: string | undefined): void {
    if (quizId && confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
      this.quizServices.deleteQuiz(quizId).subscribe({
        next: () => {
          this.quizzes = this.quizzes.filter(question => question.id?.toString() !== quizId);
          console.log('Quiz supprimé avec succès');
          this.totalItems = this.quizzes.length;
          this.applyPagination();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du Quiz :', err);
        }
      });
    }
  }

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

  ouvrirDetailsQuiz(quiz: any) {
    if (quiz && quiz.chapter && quiz.chapter.id) {
      this.quizServices.getQuizDetails(quiz.chapter.id).subscribe(
        (data: any) => {
          this.quizSelectionne = data;
          this.afficherModal = true;
        },
        error => {
          console.error('Erreur lors de la récupération des détails du quiz:', error);
        }
      );
    } else {
      console.error('Impossible de récupérer les détails du quiz : ID du chapitre manquant');
    }
  }

  fermerModal() {
    this.afficherModal = false;
    this.quizSelectionne = null;
  }
}