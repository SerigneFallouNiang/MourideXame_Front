import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chapitre-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p><strong>Description:</strong> {{ data.description }}</p>
      <div *ngIf="data.video">
        <p><strong>Vidéo:</strong></p>
        <video controls width="100%">
          <source [src]="data.video" type="video/mp4">
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="closeDialog()">Fermer</button>
    </mat-dialog-actions>
  `
})
export class ChapitreDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ChapitreDetailDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}