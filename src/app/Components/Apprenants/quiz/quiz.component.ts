import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../../Services/quizz.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarApprenantComponent } from '../../heritage/navbar-apprenant/navbar-apprenant.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarApprenantComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: any;
  questions: any[] = [];
  answers: any = {}; // Store selected answers

  submitted = false;
  score = 0;
  isPassed = false;

  selectedAnswers: { question_id: number, answer_id: number }[] = [];
  quizId: string | null = '4'; // Quiz ID (à adapter dynamiquement)

  constructor(
    private quizzservice: QuizzService,
     private route: ActivatedRoute,
    public location:Location) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const chapterId = params['id'];
      if (chapterId) {
        this.startQuiz(chapterId);
      } else {
        console.error('Aucun ID de chapitre trouvé');
      }
    });
  }

  startQuiz(chapterId: string | null) {
    this.quizzservice.getQuizz(chapterId).subscribe((data: any) => {
      this.quiz = data.quiz;
      this.questions = data.questions;
    });
  }


selectAnswer(questionId: number, answerId: number) {
  const existingAnswerIndex = this.selectedAnswers.findIndex(a => a.question_id === questionId);
  
  if (existingAnswerIndex > -1) {
    // Mettre à jour la réponse existante
    this.selectedAnswers[existingAnswerIndex].answer_id = answerId;
  } else {
    // Ajouter une nouvelle réponse
    this.selectedAnswers.push({ question_id: questionId, answer_id: answerId });
  }
}




  submitQuiz() {
    this.quizzservice.submitQuizz(this.quizId, this.selectedAnswers)
      .subscribe(
        (response: any) => {
          console.log('Quiz submitted successfully', response);
          this.score = response.score;
          this.isPassed = response.isPassed;
          
          // Mettre à jour les questions pour afficher les réponses correctes/incorrectes
          this.questions.forEach((question, index) => {
            const result = response.detailedResults.find((r: any) => r.question.id === question.id);
            if (result) {
              question.is_correct = result.is_correct;
              question.correctAnswer = result.answers.find((ans: any) => ans.is_correct);
            }
          });
          
          this.submitted = true;
        },
        (error: { error: any }) => {
          console.error(error.error.message);
          console.error('Error submitting quiz', error);
        }
      );
  }
  


    //fonction pour le retour précédé
    goToCourse(): void {
      this.location.back();
    }
}
