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
  pageQuestions: any[] = [];

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
        this.questions = data || [];
        this.totalItems = this.questions.length;
        this.applyPagination();
      },
      error => {
        console.error('Erreur lors de la récupération des livres:', error);
      }
    );
  }

  deleteQuestion(questionId: string | undefined): void {
    if (!questionId) {
      console.error('ID de la question est undefined');
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) {
      this.questionService.deleteQuestion(questionId).subscribe({
        next: () => {
          // Mettre à jour la liste principale
          this.questions = this.questions.filter(question => 
            question.id?.toString() !== questionId
          );
          
          // Mettre à jour le nombre total d'éléments
          this.totalItems = this.questions.length;
          
          // Ajuster la page courante si nécessaire
          const maxPage = Math.ceil(this.totalItems / this.itemsPerPage);
          if (this.currentPage > maxPage && maxPage > 0) {
            this.currentPage = maxPage;
          }
          
          // Réappliquer la pagination
          this.applyPagination();
          
          console.log('Question supprimée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la question :', err);
        }
      });
    }
  }

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