import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ChapitreService } from '../../../Services/chapitre.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-read-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-pdf.component.html',
  styleUrl: './read-pdf.component.css'
})
export class ReadPDFComponent implements OnInit {
  // bookName: string = '';
  // messageImage: string = "Aucune image pour ce chapitre";
  // chapters: any[] = [];
  //   // Chapitre actuellement sélectionné
  //   selectedChapter: any = null;


  // constructor(
  //   private route: ActivatedRoute,
  //   private chapitreService: ChapitreService,
  // ) {}

  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     const bookId = params['id'];
  //     this.loadChapters(bookId);
  //   });
  // }

  // loadChapters(bookId: string) {
  //   this.chapitreService.getBooksByBook(bookId).subscribe(
  //     (data: any) => {
  //       this.chapters = data.Chapitres;
  //       this.bookName = data.Livre;
  //       this.chapters.forEach(chapter => {
  //         if (chapter.Fichier) {
  //           chapter.Fichier = `${apiUrlStockage}/${chapter.Fichier}`;
  //         } else {
  //           this.messageImage = "Aucune image pour ce chapitre";
  //         }
  //       });
  //       console.log(this.chapters)
  //     },
  //     error => {
  //       console.error('Error loading chapters:', error);
  //     }
  //   );
  // }

  //   // Méthode pour sélectionner un chapitre
  //   selectChapter(chapter: any) {
  //     this.selectedChapter = chapter;
  //   }

  bookName: string = '';
  messageImage: string = "Aucune image pour ce chapitre";
  chapters: any[] = [];
  selectedChapter: any = null;

  constructor(
    private route: ActivatedRoute,
    private chapitreService: ChapitreService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const bookId = params['id'];
      this.loadChapters(bookId);
    });
  }

  loadChapters(bookId: string) {
    this.chapitreService.getBooksByBook(bookId).subscribe(
      (data: any) => {
        this.chapters = data.Chapitres;
        this.bookName = data.Livre;
        this.chapters.forEach(chapter => {
          if (chapter.Fichier) {
            chapter.Fichier = `${apiUrlStockage}/${chapter.Fichier}`;
          }
          if (chapter.Lien) {
            const embedUrl = this.getYouTubeEmbedUrl(chapter.Lien);
            chapter.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
          }
        });
        if (this.chapters.length > 0) {
          this.selectChapter(this.chapters[0]);
        }
      },
      error => {
        console.error('Error loading chapters:', error);
      }
    );
  }

  selectChapter(chapter: any) {
    this.selectedChapter = chapter;
  }

  getYouTubeEmbedUrl(url: string): string {
    // Extrait l'ID de la vidéo YouTube de l'URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      // Retourne l'URL d'incorporation
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    
    // Si l'URL n'est pas reconnue, retourne l'URL originale
    return url;
  }
}