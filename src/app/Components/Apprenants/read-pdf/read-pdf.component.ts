import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ChapitreService } from '../../../Services/chapitre.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarApprenantComponent } from '../../heritage/navbar-apprenant/navbar-apprenant.component';

@Component({
  selector: 'app-read-pdf',
  standalone: true,
  imports: [CommonModule,NavbarApprenantComponent],
  templateUrl: './read-pdf.component.html',
  styleUrl: './read-pdf.component.css'
})
export class ReadPDFComponent implements OnInit {

  bookName: string = '';
  messageImage: string = "Aucune image pour ce chapitre";
  chapters: any[] = [];
  selectedChapter: any = null;
  selectedFichier: any = null;
  pdfUrl: SafeResourceUrl | null = null;

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

  // affichageage du chapitre selectionner 
  selectChapter(chapter: any) {
    this.selectedFichier = false;
    this.selectedChapter = chapter;
    this.selectedChapter = chapter;
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
// si aucun fichier n'est selectionner par un utilisateur 
  resetSelection() {
    this.selectedFichier = false;
    this.selectedChapter = null;
    this.pdfUrl = null;
  }
}