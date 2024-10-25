// chapitre-detail-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';

@Component({
  selector: 'app-chapitre-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p><strong>Description:</strong> {{ data.description }}</p>
      <div *ngIf="videoUrl">
        <p><strong>Vidéo:</strong></p>
        <video controls width="100%">
          <source [src]="videoUrl" type="video/mp4">
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="closeDialog()">Fermer</button>
    </mat-dialog-actions>
  `
})
export class ChapitreDetailDialogComponent { // Ajout du mot-clé 'export'
  videoUrl: string | null = null; // Ajout de la propriété videoUrl

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ChapitreDetailDialogComponent>
  ) {
    // Initialiser videoUrl si data contient un video_path
    if (data.video_path) {
      this.videoUrl = `${apiUrlStockage}/${data.video_path}`;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}