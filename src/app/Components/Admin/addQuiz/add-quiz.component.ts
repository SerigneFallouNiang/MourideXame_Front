import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizzesService } from '../../../Services/Admin/quizzes.service';
import { QuestionssService } from '../../../Services/Admin/questions.service';
import { ChapitreService } from '../../../Services/chapitre.service';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  quizForm: FormGroup;
  errors: string[] = [];
  isEditMode: boolean = false;
  quizId: string | null = null;
  chapters: any[] = [];
  questions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private quizService: QuizzesService,
    private questionService: QuestionssService,
    private chapterService: ChapitreService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      chapter_id: ['', Validators.required],
      questions: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id');
    this.loadChapters();
    this.loadQuestions();

    if (this.quizId) {
      this.isEditMode = true;
      this.loadQuiz();
    }
  }



  // loadQuiz(): void {
  //   this.quizService.getQuizById(this.quizId!).subscribe({
  //     next: (data: any) => {
  //       this.quizForm.patchValue({
  //         title: data.title,
  //         chapter_id: data.chapter_id,
  //         questions: data.questions.map((q: any) => q.id)
  //       });
  //     },
  //     error: (err) => {
  //       this.handleErrors(err);
  //       this.toastr.error('Erreur lors du chargement du quiz');
  //     }
  //   });
  // }
  loadQuiz(): void {
    this.quizService.getQuizById(this.quizId!).subscribe({
      next: (data: any) => {
        console.log('Données du quiz:', data);
        this.quizForm.patchValue({
          title: data.title,
          chapter_id: data.chapter_id,
          questions: data.questions.map((q: any) => q.id.toString())
        });
        console.log('Valeur du formulaire après mise à jour:', this.quizForm.value);
      },
      error: (err) => {
        this.handleErrors(err);
        this.toastr.error('Erreur lors du chargement du quiz');
      }
    });
  }
  
  


//pour récupérer les chapitre à choisis
  loadChapters() {
    this.chapterService.getAllChapters().subscribe(
      (data: any) => {
        console.log('Réponse de l\'API:', data);
        // Récupération de la propriété 'Livres' de la réponse
        this.chapters = data.Chapitre || []; 
      },
      error => {
        console.error('Erreur lors de la récupération des livres:', error);
      }
    );
  }

  loadQuestions() {
    this.questionService.getAllQuestions().subscribe(
      (data: any) => {
        console.log('Toutes les questions:', data);
        console.log('Réponse de l\'API:', data);
        // Récupération de la propriété 'Livres' de la réponse
        this.questions = data || [];
        console.log(data);
        console.log('Questions chargées:', this.questions);
        
      },
      error => {
        console.error('Erreur lors de la récupération des livres:', error);
      }
    );
  }


  onSubmit(): void {
    if (this.quizForm.valid) {
      const formData = this.quizForm.value;

      if (this.isEditMode) {
        this.quizService.updateQuiz(this.quizId!, formData).subscribe({
          next: () => {
            this.toastr.success('Quiz modifié avec succès');
            this.router.navigate(['/quiz-admin']);
          },
          error: (err) => {
            this.handleErrors(err);
            this.toastr.error('Erreur lors de la modification du quiz');
          }
        });
      } else {
        this.quizService.createQuiz(formData).subscribe({
          next: () => {
            this.toastr.success('Quiz créé avec succès');
            this.router.navigate(['/quiz-admin']);
          },
          error: (err) => {
            this.handleErrors(err);
            this.toastr.error('Erreur lors de la création du quiz');
          }
        });
      }
    } else {
      this.toastr.warning('Veuillez remplir correctement tous les champs requis');
      this.errors = ['Veuillez remplir le formulaire correctement.'];
    }
  }

  handleErrors(err: any): void {
    this.errors = err.error.errors ? Object.values(err.error.errors) : [err.error.message];
    this.errors.forEach(error => {
      this.toastr.error(error as string);
    });
  }

  isQuestionSelected(questionId: string): boolean {
    const selectedQuestions = this.quizForm.get('questions')?.value || [];
    return selectedQuestions.includes(questionId.toString());
  }

  onQuestionChange(questionId: string, event: any): void {
    const selectedQuestions = this.quizForm.get('questions')?.value || [];
    if (event.target.checked) {
      if (!selectedQuestions.includes(questionId.toString())) {
        selectedQuestions.push(questionId.toString());
      }
    } else {
      const index = selectedQuestions.indexOf(questionId.toString());
      if (index > -1) {
        selectedQuestions.splice(index, 1);
      }
    }
    this.quizForm.patchValue({ questions: selectedQuestions });
  }
}
