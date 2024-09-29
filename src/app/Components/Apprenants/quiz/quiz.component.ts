import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../../Services/quizz.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarApprenantComponent } from '../../heritage/navbar-apprenant/navbar-apprenant.component';

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

  constructor(private quizzservice: QuizzService, private route: ActivatedRoute) {}

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

  // Update answers object whenever an answer is selected
  // selectAnswer(questionId: string, answerId: string) {
  //   this.answers[questionId] = answerId;
  // }

  // selectedAnswers: { question_id: number, answer_id: number }[] = [];

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


  // submitQuiz() {
  //   const quizId = this.quiz.id;
  //   this.quizzservice.submitQuizz(quizId, this.answers).subscribe((result: any) => {
  //     console.log('Quiz result:', result);
  //     // Display the result in the component
  //   });
  // }

  // submitQuiz() {
  //   this.quizzservice.submitQuizz(this.quizId, this.selectedAnswers)
  //     .subscribe(
  //       (response: any) => {
  //         console.log('Quiz soumis avec succès', response);
  //       },
  //       (error:{error:any}) => {
  //         console.error(error.error.message);
  //         console.error('Erreur lors de la soumission du quiz', error);
  //       }
  //     );
  // }

  submitQuiz() {
    this.quizzservice.submitQuizz(this.quizId, this.selectedAnswers)
      .subscribe(
        (response: any) => {
          console.log('Quiz submitted successfully', response);
          this.score = response.score;
          this.isPassed = response.isPassed;
          
          // Update questions to show correct/incorrect answers
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
  
}
