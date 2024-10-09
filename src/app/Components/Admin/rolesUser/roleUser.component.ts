import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RolesService } from '../../../Services/Admin/roles.service'; // Import du service

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './roleUser.component.html',
  styleUrl: './roleUser.component.css',
})
export class RoleUserComponent {

  roles: any[] = [];
  pageRoles: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 0;

  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {
    this.fetchRoles();
  }

  // Récupérer la liste des rôles
  fetchRoles() {
    this.rolesService.getAllRoles().subscribe(
      (data: any) => {
        console.log('Réponse de l\'API:', data);
        this.roles = data.data || [];
        this.totalItems = this.roles.length;
        this.applyPagination();
      },
      error => {
        console.error('Erreur lors de la récupération des rôles:', error);
      }
    );
  }

  // Supprimer un rôle
  deleteRole(roleId: string | undefined): void {
    if (roleId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
        this.rolesService.deleteRole(roleId).subscribe({
          next: () => {
            this.roles = this.roles.filter(role => role.id?.toString() !== roleId);
            this.totalItems = this.roles.length;
            this.applyPagination();
            console.log('Rôle supprimé avec succès');
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du rôle :', err);
          }
        });
      }
    } else {
      console.error('ID du rôle est undefined');
    }
  }

  // Pagination
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pageRoles = this.roles.slice(startIndex, endIndex);
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
