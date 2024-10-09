import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesService } from '../../../Services/Admin/roles.service';

@Component({
  selector: 'app-user-history-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal" [class.show]="isVisible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Historique de lecture</h5>
            <button type="button" class="close" (click)="onClose()">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div *ngIf="loading" class="text-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Chargement...</span>
              </div>
            </div>
            <div *ngIf="!loading && books.length === 0">
              Aucun livre lu par cet utilisateur.
            </div>
            <div *ngIf="!loading && books.length > 0">
              <div class="list-group">
                <div *ngFor="let book of books" class="list-group-item">
                  <h6 class="mb-1">{{book.title}}</h6>
                  <p class="mb-1">{{book.description}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="onClose()">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1050;
    }
    .modal.show {
      display: block;
    }
    .modal-dialog {
      margin: 1.75rem auto;
    }
  `]
})
export class UserHistoryModalComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() userId: string | null = null;
  @Output() closeModal = new EventEmitter<void>();
  
  loading: boolean = false;
  books: any[] = [];

  constructor(private rolesService: RolesService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && changes['userId'].currentValue && this.isVisible) {
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