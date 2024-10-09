import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChapitreService } from '../../../Services/chapitre.service';
import { ToastrService } from 'ngx-toastr';
import { ChapitreDetailDialogComponent } from './chapitre-detail-dialog.component';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';

@Component({
  selector: 'app-livres',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    MatDialogModule
  ],
  templateUrl: './chapitres.component.html',
  styleUrls: ['./chapitres.component.css']
})
export class ChapitreAdminComponent implements OnInit {
  messageImage: string = "Aucune image pour ce livre";
  chapitres: any[] = [];

  pageChapitres: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0;

  constructor(
    private chapitreService: ChapitreService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    
  }

  ngOnInit(): void {
    this.fetchChapitre();
  }

  fetchChapitre() {
    this.chapitreService.getAllChapters().subscribe(
      (data: any) => {
        this.chapitres = data.Chapitre || [];
        this.totalItems = this.chapitres.length;
        this.applyPagination();
        this.chapitres.forEach(chapitre => {
          if (chapitre.video) {
            chapitre.video = `${apiUrlStockage}/${chapitre.video}`;
          } else {
            chapitre.video = this.messageImage;
          }
        });
      },
      error => {
        console.error('Erreur lors de la récupération des chapitres:', error);
        this.toastr.error('Erreur lors du chargement des chapitres');
      }
    );
  }

  openChapterDetails(chapitre: any): void {
    const dialogRef = this.dialog.open(ChapitreDetailDialogComponent, {
      width: '600px',
      data: chapitre
    });

    // Pour gérer les actions après la fermeture du dialog
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fermé');
    });
  }

  deleteChapitre(livreId: string | undefined): void {
    if (livreId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce chapitre ?')) {
        this.chapitreService.deleteChapitre(livreId).subscribe({
          next: () => {
            this.chapitres = this.chapitres.filter(chapitre => chapitre.id?.toString() !== livreId);
            this.toastr.success('Chapitre supprimé avec succès');
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du chapitre:', err);
            this.toastr.error('Erreur lors de la suppression');
          }
        });
      }
    }
  }




//pagination
applyPagination() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.pageChapitres = this.chapitres.slice(startIndex, endIndex);
}

get totalPages(): number {
  return Math.ceil(this.totalItems / this.itemsPerPage);
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.applyPagination();
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.applyPagination();
  }
}
}