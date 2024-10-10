// import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ChapitreService } from '../../../Services/chapitre.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarApprenantComponent } from '../../heritage/navbar-apprenant/navbar-apprenant.component';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ChaptersListComponent } from '../../heritage/chapters-list/chapters-list.component';
import { QuizzService } from '../../../Services/quizz.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-pdf',
  standalone: true,
  imports: [CommonModule,NavbarApprenantComponent,FormsModule,ChaptersListComponent],
  templateUrl: './read-pdf.component.html',
  styleUrl: './read-pdf.component.css'
})
export class ReadPDFComponent implements OnInit {

  bookName: string = '';
  messageImage: string = "Aucune image pour ce chapitre";
  chapters: any[] = [];
  searchTerm: string = ''; 
  filteredChapiters: any[] = [];
  selectedChapter: any = null;
  selectedQuiz: any = null;
  selectedFichier: any = null;
  pdfUrl: SafeResourceUrl | null = null;
  bookId: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private chapitreService: ChapitreService,
    public sanitizer: DomSanitizer,
    public location:Location,
    private router: Router,
    private quizzservice: QuizzService,
  ) {}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      this.loadChapters(this.bookId);
    });
    this.filteredChapiters = this.chapters;
  
    // information quiz 
    this.route.params.subscribe(params => {
      const chapterId = params['id'];
      if (chapterId) {
        this.startQuiz(chapterId);
      } else {
        console.error('Aucun ID de chapitre trouvé');
      }
    });
  }

  loadChapters(bookId: string) {
    this.chapitreService.getBooksByBook(bookId).subscribe(
      (data: any) => {
        this.chapters = data.Chapitres;
        this.bookName = data.Livre;
        this.filteredChapiters = this.chapters; 
        this.chapters.forEach(chapter => {
           // Si le chapitre est marqué comme "lu", ajouter une propriété 'lue' à true
           chapter.lue = chapter.lue || false;

           chapter.terminer = chapter.terminer || 0;

 
           // Récupérer le fichier PDF et la vidéo s'ils existent
          //récupération du fichier pdf
          if (chapter.Fichier) {
            chapter.Fichier = `${apiUrlStockage}/${chapter.Fichier}`;
          }
          if (chapter.Video) {
            chapter.Video = `${apiUrlStockage}/${chapter.Video}`;
          } else {
            this.messageImage = "Aucune vidéo pour ce chapitre";
          }
        });


      // Si des chapitres existent, sélectionnez le premier chapitre
        // if (this.chapters.length < 2) {
        //   // this.selectChapter(this.chapters[0]);
        //   this.selectedFichier();
        // }
        if (this.chapters.length > 0 && this.chapters[0].Fichier) {
          this.selectFichier(this.chapters[0].Fichier);
        }
      },
      error => {
        console.error('Error loading chapters:', error);
      }
    );
  }

  // affichageage du chapitre selectionner 
  selectChapter(chapter: any) {
    // Réinitialiser l'état sélectionné pour tous les chapitres
  this.chapters.forEach(chap => chap.isSelected = false);

    // Définir l'état sélectionné pour le chapitre cliqué
    chapter.isSelected = true;
    this.selectedFichier = false;
    this.selectedQuiz = false;
    this.selectedChapter = chapter;  

    // this.selectedChapter = chapter;
    console.log('Selected chapter:', this.selectedChapter); 

      // Vérifier si le chapitre est déjà marqué comme lu
  if (chapter.lue) {
    console.log('Ce chapitre a déjà été lu.');
  } else {
     // Appel pour marquer le chapitre comme lu
     if (chapter.id) {
      this.chapitreService.markChapterAsRead(chapter.id).subscribe(
        (response: any) => {
          console.log('Chapitre marqué comme lu:', response);
          // Mettre à jour l'état dans le frontend
          chapter.lue = true;
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour du chapitre:', error);
        }
      );
    }
  }


   // Récupérer le quiz associé au chapitre
   if (chapter.id) {
    this.quizzservice.getQuizz(chapter.id).subscribe(
      (quizData: any) => {
        if (quizData && quizData.quiz) {
          this.selectedQuiz = quizData.quiz;
          this.questions = quizData.questions;
        } else {
          console.log('Aucun quiz disponible pour ce chapitre');
        }
      },
      (error:any) => {
        console.error('Erreur lors de la récupération du quiz:', error);
      }
    );
  }
  }

  
  //  // affichageage du chapitre selectionner 

  selectFichier(fichier: string) {
    this.selectedFichier = true;
    this.selectedChapter = null;
    this.selectedQuiz = null;

    this.selectedFichier = fichier;
    // Sanitize the URL to prevent XSS attacks
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fichier);
  }


  selectQuiz(fichier: string) {
    this.selectedFichier = true;
    this.selectedChapter = null;
    this.selectedQuiz = this.quizId;
  }

// si aucun fichier n'est selectionner par un utilisateur 
  resetSelection() {
    this.selectedFichier = false;
    this.selectedChapter = null;
    this.selectedQuiz = null;
    this.pdfUrl = null;
  }

   // Fonction de recherche pour filtrer les chapitre
   searchBooks() {
    this.filteredChapiters = this.chapters.filter(chapiter =>
      chapiter['Titre du chapitre'].toLowerCase().includes(this.searchTerm.toLowerCase())
    );

  }
  
  //fonction pour le retour précédé
  goBack(): void {
    if (this.bookId) {
      // Navigue vers la page des livres avec l'ID du livre
      this.router.navigate(['/books', this.bookId]);
    } else {
      // Fallback vers la page des livres si pas d'ID
      this.router.navigate(['/books']);
    }
  }

// information de la soumission d'un quiz 
quiz: any;
  questions: any[] = [];
  answers: any = {}; // Store selected answers

  submitted = false;
  score = 0;
  isPassed = false;

  selectedAnswers: { question_id: number, answer_id: number }[] = [];
  quizId: string | null = '4'; // Quiz ID (à adapter dynamiquement)


  checkAndStartQuiz(chapterId: string) {
    const authUser = localStorage.getItem("authUser"); // Récupérer les informations de l'utilisateur dans le local storage
    
    if (authUser) {
      // Si l'utilisateur est connecté, démarrer le quiz
      this.startQuiz(chapterId);
    } else {
      // Si l'utilisateur n'est pas connecté, le rediriger vers la page de login
      this.router.navigate(['/login']);
    }
  }
  



  startQuiz(chapterId?: string) {
    this.selectedFichier = null;
    this.selectedChapter = null;
    // Réinitialiser les variables du quiz
    this.submitted = false;
    this.score = 0;
    this.isPassed = false;
    this.selectedAnswers = [];
  
    if (chapterId) {
      this.quizzservice.getQuizz(chapterId).subscribe(
        (data: any) => {
          this.quiz = data.quiz;
          this.questions = data.questions;
          this.selectedQuiz = this.quiz;
        },
        (error) => {
          console.error('Erreur lors de la récupération du quiz:', error);
        }
      );
    }
  }

  

selectAnswer(questionId: number, answerId: number) {
  const existingAnswerIndex = this.selectedAnswers.findIndex(a => a.question_id === questionId);
  
  this.errorMessage = '';
  if (existingAnswerIndex > -1) {
    // Mettre à jour la réponse existante
    this.selectedAnswers[existingAnswerIndex].answer_id = answerId;
  } else {
    // Ajouter une nouvelle réponse
    this.selectedAnswers.push({ question_id: questionId, answer_id: answerId });
  }
}

  


    //fonction pour le retour précédé
    goToCourse(): void {
      this.location.back();
    }

    submitQuiz() {
   

      if (this.selectedQuiz && this.selectedQuiz.id) {
        this.quizzservice.submitQuizz(this.selectedQuiz.id, this.selectedAnswers)
          .subscribe(
            (response: any) => {
              console.log('Quiz submitted successfully', response);
              this.score = response.score;
              this.isPassed = response.isPassed;
              
              this.questions.forEach((question, index) => {
                const result = response.detailedResults.find((r: any) => r.question.id === question.id);
                if (result) {
                  question.is_correct = result.is_correct;
                  question.correctAnswer = result.answers.find((ans: any) => ans.is_correct);
                }   // Vérifie si toutes les questions ont une réponse
                if (Object.keys(this.selectedAnswers).length !== this.questions.length) {
                  this.errorMessage = 'Veuillez répondre à toutes les questions avant de soumettre le quiz.';
                  return; // Stopper la soumission
                }
              });
              


              // Vérifie si toutes les questions ont une réponse
              if (Object.keys(this.selectedAnswers).length !== this.questions.length) {
                this.errorMessage = 'Veuillez répondre à toutes les questions avant de soumettre le quiz.';
              
                // Faire disparaître le message d'erreur après 2 secondes
                setTimeout(() => {
                  this.errorMessage = ''; // Réinitialiser le message d'erreur
                }, 3000); // 2000 millisecondes = 2 secondes
              
                return; // Stopper la soumission
              }
              

              this.submitted = true;
              this.errorMessage = '';
            },
            (error: { error: any }) => {
              console.error('Error submitting quiz', error);
            }
          );
      } else {
        console.error('No quiz selected or invalid quiz ID');
      }
    }
}