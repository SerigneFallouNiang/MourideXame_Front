import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ChapitreService } from '../../../Services/chapitre.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarApprenantComponent } from '../../heritage/navbar-apprenant/navbar-apprenant.component';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-read-pdf',
  standalone: true,
  imports: [CommonModule,NavbarApprenantComponent,FormsModule],
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
  selectedFichier: any = null;
  pdfUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private chapitreService: ChapitreService,
    public sanitizer: DomSanitizer,
    public location:Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const bookId = params['id'];
      this.loadChapters(bookId);
    });
    this.filteredChapiters = this.chapters;
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
        if (this.chapters.length > 0) {
          this.selectChapter(this.chapters[0]);
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
  }

  
  //  // affichageage du chapitre selectionner 
  //  selectFichier(chapter: any) {
  //   this.selectedFichier= chapter.Fichier;
  // }

  selectFichier(fichier: string) {
    this.selectedFichier = true;
    this.selectedChapter = null;

    this.selectedFichier = fichier;
    // Sanitize the URL to prevent XSS attacks
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fichier);
  }

  // getYouTubeEmbedUrl(url: string): string {
  //   // Extrait l'ID de la vidéo YouTube de l'URL
  //   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  //   const match = url.match(regExp);
    
  //   if (match && match[2].length === 11) {
  //     // Retourne l'URL d'incorporation
  //     return `https://www.youtube.com/embed/${match[2]}`;
  //   }
    
  //   // Si l'URL n'est pas reconnue, retourne l'URL originale
  //   return url;
  // }
// si aucun fichier n'est selectionner par un utilisateur 
  resetSelection() {
    this.selectedFichier = false;
    this.selectedChapter = null;
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
    this.location.back();
  }

    // Method to navigate to the quiz page for the selected chapter
   startQuiz(chapterId: string) {
  if (!chapterId) {
    console.error('ID de chapitre invalide :', chapterId);
    return;
  }
  this.router.navigate(['/quiz', chapterId]); 
}

}