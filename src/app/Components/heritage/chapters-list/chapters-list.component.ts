import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chapters-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.css']
})
export class ChaptersListComponent implements OnInit {
  @Input() bookId: string = ''; // book ID as input
  @Input() chapters: any[] = []; // input to allow dynamic chapter data
  @Input() bookName: string = ''; // book name input
  @Output() chapterSelected = new EventEmitter<any>(); // output to emit events
  
  searchTerm: string = ''; // search term for filtering chapters
  filteredChapiters: any[] = []; // filtered list of chapters
  selectedChapter: any = null; // currently selected chapter
  selectedFichier: any = null; // currently selected file
  pdfUrl: SafeResourceUrl | null = null; // sanitized URL for PDF files

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.filteredChapiters = this.chapters; // Initialize with full list of chapters
    if (this.chapters.length > 0) {
      this.selectChapter(this.chapters[0]);
    }
  }

  // Method to handle chapter selection
  selectChapter(chapter: any) {
    this.chapters.forEach(chap => chap.isSelected = false);
    chapter.isSelected = true;
    this.selectedFichier = null;
    this.selectedChapter = chapter;
    this.chapterSelected.emit(this.selectedChapter); // Emit the selected chapter
  }

  // Method to select a file and display it
  selectFichier(fichier: string) {
    this.selectedFichier = fichier;
    this.selectedChapter = null;
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fichier);
  }

  // Method to filter chapters based on search term
  searchBooks() {
    this.filteredChapiters = this.chapters.filter(chapter =>
      chapter['Titre du chapitre'].toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
