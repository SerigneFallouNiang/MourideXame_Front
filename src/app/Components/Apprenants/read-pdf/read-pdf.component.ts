import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ChapitreService } from '../../../Services/chapitre.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-pdf.component.html',
  styleUrl: './read-pdf.component.css'
})
export class ReadPDFComponent implements OnInit {
  bookName: string = '';
  messageImage: string = "Aucune image pour ce chapitre";
  chapters: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private chapitreService: ChapitreService
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
          } else {
            this.messageImage = "Aucune image pour ce chapitre";
          }
        });
        console.log(this.chapters)
      },
      error => {
        console.error('Error loading chapters:', error);
      }
    );
  }
}