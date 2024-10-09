import { Component, Input } from '@angular/core';
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
            <button type="button" class="close" (click)="close()">
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
                  <h6 class="mb-1">{{book.titre}}</h6>
                  <p class="mb-1">{{book.description}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="close()">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      display: none;
      background-color: rgba(0,0,0,0.5);
    }
    .modal.show {
      display: block;
    }
  `]
})
export class UserHistoryModalComponent {
  @Input() isVisible: boolean = false;
  loading: boolean = false;
  books: any[] = [];

  constructor(private rolesService: RolesService) {}

  showHistory(userId: string) {
    this.isVisible = true;
    this.loading = true;
    this.rolesService.getUserHistory(userId).subscribe({
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

  close() {
    this.isVisible = false;
  }
}