import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CategorieService } from '../../../Services/categorie.service';
import { ModelCategorie } from '../../../Models/categorie.model';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { AuthService } from '../../../Services/auth.service';
import { BookService } from '../../../Services/book.service';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {
  // Tableau des catégories
  tabCategorie: ModelCategorie[] = [];
  categorieObject: ModelCategorie = {};
  messageImage: string = "Aucune image pour cette catégorie";

  // Variables de pagination
  currentPage = 1;
  itemsPerPage = 3;
  totalUsers: number = 0;
  totalCategories: number = 0;
  totalLivres: number = 0;
  constructor(
    private categorieService: CategorieService,
    private userService: AuthService,
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    this.fetchCategorie();
    this.fetchTotalUsers(); 
    this.fetchTotalCategories(); 
    this.fetchTotalLivres(); 
  }

  // Récupération de toutes les catégories
  fetchCategorie() {
    this.categorieService.getAllCategorie().subscribe(
      (response: any) => {
        if (response['Catégorie']) {
          this.tabCategorie = response['Catégorie'].reverse();
          
          // Mise à jour des URLs des images
          this.tabCategorie.forEach(categorie => {
            if (categorie.image) {
              categorie.image = `${apiUrlStockage}/${categorie.image}`;
            }
          });
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    );
  }

   //Récupération du nombre d'utilisateurs
   fetchTotalUsers(): void {
    this.userService.countUser().subscribe(
      (data: any) => {
        this.totalUsers = data.user_count;
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  //Récupération du nombre de categories
  fetchTotalCategories(): void {
    this.categorieService.countCategories().subscribe(
      (data: any) => {
        this.totalCategories = data.count; // Corrigez ici
      },
      (error) => {
        console.error('Error fetching categories count:', error); // Message d'erreur corrigé
      }
    );
  }


   //Récupération du nombre de categories
   fetchTotalLivres(): void {
    this.bookService.countBooks().subscribe(
      (data: any) => {
        this.totalLivres = data.count; // Corrigez ici
      },
      (error) => {
        console.error('Error fetching categories count:', error); // Message d'erreur corrigé
      }
    );
  }


  // Getter pour la pagination
  get pagedCategories() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tabCategorie.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.tabCategorie.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}