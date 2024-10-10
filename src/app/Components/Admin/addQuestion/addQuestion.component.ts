import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategorieService } from '../../../Services/categorie.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../Services/book.service';
import { title } from 'process';
import { QuestionssService } from '../../../Services/Admin/questions.service';


@Component({
  selector: 'app-add-roles',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './addQuestion.component.html',
  styleUrl: './addQuestion.component.css',
})
export class AddQuestionsComponent implements OnInit {
  questionForm: FormGroup;
  errors: string[] = [];
  isEditMode: boolean = false;
  questionId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private questionService: QuestionssService,
  ) {
    this.questionForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3)]],
      // points: [0, Validators.required], // Ajout des points
      answers: this.fb.array([]), // FormArray pour les options de réponses
    });
  }

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('id');
    if (this.questionId) {
      this.isEditMode = true;
      this.loadQuestion();
    } else {
      this.addOption(); // Ajouter un champ d'option initial si on crée une nouvelle question
    }
  }

  // Récupérer les options de réponses sous forme de FormArray
  answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  // Ajouter une nouvelle option
  addOption(): void {
    this.answers().push(this.fb.group({
      text: ['', Validators.required],
      correct_one: [false, Validators.required]
    }));

  }

  // Supprimer une option
  removeOption(index: number): void {
    if (this.answers().length > 1) {
      const removedControl = this.answers().at(index);
      this.answers().removeAt(index);

      // If we removed the correct answer, set the first remaining answer as correct
      if (removedControl.get('correct_one')?.value === true) {
        this.answers().at(0).patchValue({ correct_one: true });
      }
    } else {
      this.toastr.warning('Vous devez avoir au moins une option');
    }
  }

  // Charger une question à modifier (mode édition)
// Charger une question à modifier (mode édition)
loadQuestion(): void {
  this.questionService.getEditById(this.questionId!).subscribe({
    next: (data: any) => {
      this.questionForm.patchValue({
        text: data.question.text,
      });
      
      // Charger les réponses
      data.question.answers.forEach((answer: any) => {
        this.addOption();
        this.answers().at(-1)?.patchValue({
          text: answer.text,
          correct_one: answer.correct_one  // Sélectionne la bonne option
        });
      });
    },
    error: (err) => {
      this.handleErrors(err);
      this.toastr.error('Erreur lors du chargement de la question');
    }
  });
}

onRadioChange(selectedIndex: number): void {
  // Update all radio buttons, setting only the selected one to true
  this.answers().controls.forEach((control, index) => {
    control.patchValue({ correct_one: index === selectedIndex }, { emitEvent: false });
  });
}


  onSubmit(): void {
    if (this.questionForm.valid) {
      const formData = this.questionForm.value;

      if (this.isEditMode) {
        this.questionService.updateQuestion(this.questionId!, formData).subscribe({
          next: () => {
            this.toastr.success('Question mise à jour avec succès');
            this.router.navigate(['/questions']);
          },
          error: (err) => {
            this.handleErrors(err);
            this.toastr.error('Erreur lors de la mise à jour de la question');
          }
        });
      } else {
        this.questionService.createQuestion(formData).subscribe({
          next: () => {
            this.toastr.success('Question créée avec succès');
            this.resetForm();
            this.router.navigate(['/questions']);
          },
          error: (err) => {
            this.handleErrors(err);
            this.toastr.error('Erreur lors de la création de la question');
          }
        });
      }
    } else {
      this.toastr.warning('Veuillez remplir correctement tous les champs requis');
      this.errors = ['Veuillez remplir le formulaire correctement.'];
    }
  }

  // Réinitialiser le formulaire après la soumission
  resetForm(): void {
    this.questionForm.reset();
    this.answers().clear();
    this.addOption(); // Réinitialiser avec une option initiale
  }

  

  handleErrors(err: any): void {
    this.errors = err.error.errors ? Object.values(err.error.errors) : [err.error.message];
    this.errors.forEach(error => {
      this.toastr.error(error as string);
    });
  }
}