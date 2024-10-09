import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuestionssService } from '../../../Services/Admin/questions.service';
import { RolesService } from '../../../Services/Admin/roles.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livres',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateurComponent implements OnInit {
  messageImage: string = "Aucune image pour ce livre";
  utilisateurs: any[] = [];
  roles: any[] = [];
   // Pour stocker les livres de la page actuelle
   pageQuestions: any[] = [];

   // Pagination variables
    currentPage: number = 1;
    itemsPerPage: number = 18;
    totalItems: number = 0;

  constructor(private roleService: RolesService) {}

  ngOnInit(): void {
    this.fetchUtilisateurs();
    this.fetchRoles();
  }

  fetchUtilisateurs() {
    this.roleService.getAllUsers().subscribe(
      (data: any) => {
        console.log('Réponse de l\'API:', data);
        // Récupération de la propriété 'Livres' de la réponse
        this.utilisateurs = data.users || [];

         // récuoération du nombre de page
         this.totalItems = this.utilisateurs.length;

         // appel à la fonction de pagination
         this.applyPagination();
      },
      error => {
        console.error('Erreur lors de la récupération des livres:', error);
      }
    );
  }


  fetchRoles() {
    this.roleService.getAllRoles().subscribe(
      (data: any) => {
        this.roles = data.data || []; // Assurez-vous que la réponse est correcte
      },
      (error) => {
        console.error('Erreur lors de la récupération des rôles:', error);
      }
    );
  }
//   deleteQuestion(questionId: string | undefined): void {
//     if (questionId) {  // Vérifiez si l'ID n'est pas undefined
//       if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
//         this.questionService.deleteQuestion(questionId).subscribe({
//           next: () => {
//             this.questions = this.questions.filter(question => question.id?.toString() !== questionId);
//             console.log('Catégorie supprimée avec succès');
//           },
//           error: (err) => {
//             console.error('Erreur lors de la suppression de la catégorie :', err);
//           }
//         });
//       }
//     } else {
//       console.error('ID de la catégorie est undefined');
//     }
// }


  //les methode de la pagination
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pageQuestions = this.utilisateurs.slice(startIndex, endIndex);
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

   // Mettre à jour le rôle d'un utilisateur
   updateRole(userId: string, selectedRoleId: string): void {
    if (!userId || !selectedRoleId) {
      console.error('UserId ou RoleId manquant');
      return;
    }

    this.roleService.updateUserRole(userId, selectedRoleId).subscribe({
      next: (response) => {
        console.log('Rôle mis à jour avec succès', response);
        // Optionnel : rafraîchir la liste des utilisateurs
        this.fetchUtilisateurs();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du rôle :', err);
      }
    });
  }
}
  
