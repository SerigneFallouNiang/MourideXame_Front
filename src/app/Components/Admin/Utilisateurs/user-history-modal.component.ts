import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesService } from '../../../Services/Admin/roles.service';

interface Book {
  title: string;
  description: string;
}

@Component({
  selector: 'app-user-history-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" [ngClass]="{'show': isVisible}" (click)="onClose()">
      <div class="modal-dialog" role="document" (click)="$event.stopPropagation()">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Historique de lecture</h5>
            <button type="button" class="close" (click)="onClose()">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ng-container *ngIf="loading; else content">
              <div class="text-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Chargement...</span>
                </div>
              </div>
            </ng-container>
            <ng-template #content>
              <h6 class="section-title" *ngIf="books.length > 0">Livres lus :</h6>
              <ul class="book-list" *ngIf="books.length > 0">
                <li *ngFor="let book of books; let i = index" class="book-item">
                  <div class="book-title">
                    <span class="book-number">{{ i + 1 }}.</span> {{ book.title }}
                  </div>
                  <div class="book-description">
                    {{ book.description }}
                  </div>
                </li>
              </ul>
              <p *ngIf="books.length === 0" class="no-books">Aucun livre lu par cet utilisateur.</p>
            </ng-template>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="onClose()">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1050;
    }
    .modal-overlay.show {
      display: block;
    }
    .modal-dialog {
      position: relative;
      width: auto;
      margin: 0.5rem;
      pointer-events: none;
      max-width: 500px;
      margin: 1.75rem auto;
    }
    .modal-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      pointer-events: auto;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid rgba(0,0,0,.2);
      border-radius: 0.3rem;
      outline: 0;
    }
    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
    }
    .modal-title {
      margin-bottom: 0;
      line-height: 1.5;
    }
    .close {
      padding: 1rem;
      margin: -1rem -1rem -1rem auto;
      background-color: transparent;
      border: 0;
      -webkit-appearance: none;
      float: right;
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1;
      color: #000;
      text-shadow: 0 1px 0 #fff;
      opacity: .5;
    }
    .modal-body {
      position: relative;
      flex: 1 1 auto;
      padding: 1rem;
    }
    .section-title {
      margin-bottom: 0.5rem;
    }
    .book-list {
      list-style-type: none;
      padding-left: 0;
    }
    .book-item {
      margin-bottom: 1rem;
    }
    .book-title {
      font-weight: bold;
    }
    .book-number {
      margin-right: 0.5rem;
    }
    .book-description {
      margin-left: 1.5rem;
    }
    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 1rem;
      border-top: 1px solid #e9ecef;
    }
    .btn-primary {
      color: #fff;
      background-color: #007bff;
      border-color: #007bff;
    }
    .spinner-border {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      vertical-align: text-bottom;
      border: 0.25em solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      -webkit-animation: spinner-border .75s linear infinite;
      animation: spinner-border .75s linear infinite;
    }
    @keyframes spinner-border {
      to { transform: rotate(360deg); }
    }
    .text-center {
      text-align: center;
    }
    .no-books {
      text-align: center;
      color: #6c757d;
    }
  `]
})
export class UserHistoryModalComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() userId: string | null = null;
  @Output() closeModal = new EventEmitter<void>();

  loading = false;
  books: Book[] = [];

  constructor(private rolesService: RolesService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']?.currentValue && this.isVisible) {
      this.loadHistory();
    }
  }

  loadHistory() {
    if (!this.userId) return;
    this.loading = true;
    this.rolesService.getUserHistory(this.userId).subscribe({
      next: (response) => {
        this.books = response.books;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'historique:', error);
        this.loading = false;
      }
    });
  }

  onClose() {
    this.closeModal.emit();
  }
}