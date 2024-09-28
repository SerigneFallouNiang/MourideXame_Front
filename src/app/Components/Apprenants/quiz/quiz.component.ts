import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../../Services/quizz.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: any;
  questions: any[] = [];
  answers: any = {}; // Store selected answers

  constructor(private quizzservice: QuizzService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const chapterId = this.route.snapshot.paramMap.get('id');
    this.startQuiz(chapterId);
  }

  startQuiz(chapterId: string | null) {
    this.quizzservice.getQuizz(chapterId).subscribe((data: any) => {
      this.quiz = data.quiz;
      this.questions = data.questions;
    });
  }

  // Update answers object whenever an answer is selected
  selectAnswer(questionId: string, answerId: string) {
    this.answers[questionId] = answerId;
  }

  submitQuiz() {
    const quizId = this.quiz.id;
    this.quizzservice.submitQuizz(quizId, this.answers).subscribe((result: any) => {
      console.log('Quiz result:', result);
      // Display the result in the component
    });
  }
}
