import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RolesService } from '../../../Services/Admin/roles.service';
import { CategorieService } from '../../../Services/categorie.service';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class Role implements OnInit {
  roles: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.loadRoles(this.currentPage); // Charger les rôles de la page actuelle
  }

  loadRoles(page: number = 1): void {
    this.categorieService.getCategorieAdmin().subscribe((data: any) => {
      this.roles = data.data; 
      this.currentPage = data.current_page; // Page actuelle
      this.totalPages = data.last_page; // Total des pages
    });
  }

  // Méthode pour changer de page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadRoles(page); // Charger les rôles pour la page spécifiée
    }
  }

  // le ts de l'ajout et de la modification 

}
