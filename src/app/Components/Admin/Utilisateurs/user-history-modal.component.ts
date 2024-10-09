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
    <div class="modal" [class.show]="isVisible">
      <div class="modal-content">
        <header>
          <h2>Historique de lecture</h2>
          <button (click)="onClose()" aria-label="Fermer">×</button>
        </header>
        <main>
          <ng-container *ngIf="loading; else content">
            <p class="loading">Chargement...</p>
          </ng-container>
          <ng-template #content>
            <p *ngIf="books.length === 0">Aucun livre lu par cet utilisateur.</p>
            <ul *ngIf="books.length > 0">
              <li *ngFor="let book of books">
                <h3>{{ book.title }}</h3>
                <p>{{ book.description }}</p>
              </li>
            </ul>
          </ng-template>
        </main>
        <footer>
          <button (click)="onClose()">Fermer</button>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      display: none;
      position: fixed;
      inset: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 1050;
    }
    .modal.show { display: flex; }
    .modal-content {
      background: white;
      margin: auto;
      padding: 1rem;
      border-radius: 8px;
      max-width: 500px;
      width: 100%;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    ul { padding: 0; list-style-type: none; }
    li { margin-bottom: 1rem; }
    .loading { text-align: center; }
    button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: #f0f0f0;
      cursor: pointer;
    }
    footer { text-align: right; margin-top: 1rem; }
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