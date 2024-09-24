import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { NavbarApprenantComponent } from '../../heritage/navbar-apprenant/navbar-apprenant.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../Services/book.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-xassidas-liste',
  standalone: true,
  imports: [CommonModule,NavbarApprenantComponent,FormsModule],
  templateUrl: './xassidas-liste.component.html',
  styleUrl: './xassidas-liste.component.css'
})
export class XassidasListeComponent implements OnInit{

  // les variable déclarer 
  isListView: boolean = true;
  isMobile: boolean = false;
  //fonction toggle des deux button
  // toggleView(){
  //   this.isListView = !this.isListView
  // }

  toggleView(): void {
    // Appliquer la bascule seulement si l'appareil est mobile
    if (this.isMobile) {
      this.isListView = !this.isListView;
    }
  }

  books: any[] = [];
  filteredBooks: any[] = []; // Pour stocker les résultats filtrés
  categoryName: string = '';
  messageImage: string = "Aucune image pour ce categorie";
  searchTerm: string = ''; // Variable pour le terme de recherche

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router:Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      this.loadBooks(categoryId);
      this.filteredBooks = this.books;
    });

    //manipulation de l'affichage en mode mobile
    this.breakpointObserver.observe([Breakpoints.Handset])
    .subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  loadBooks(categoryId: string) {
    this.bookService.getBooksByCategory(categoryId).subscribe(
      (data: any) => {
        this.books = data.books;
        //mettre les livre dans le variable filteredBooks
        this.filteredBooks = this.books; 
        this.categoryName = data.categoryName;
         // Met à jour l'URL de l'image pour chaque catégorie
         this.books.forEach(books => {
          if (books.image) {
            books.image = `${apiUrlStockage}/${books.image}`;
          } else {
            this.messageImage = "Aucune image pour cette catégorie";
          }
        });
      },
      error => {
        console.error('Error loading books:', error);
      }
    );
  }

   // la méthode pour rediriger vers la page d'accueil
   goToAccueil(): void {
    this.router.navigate(['/accueil']);
  }

//redirection pa id vers la lecture du livre
onBookClick(bookId: number | string): void {
  const idAsString = bookId.toString();
  this.router.navigate(['/books', idAsString]);
}



  // Fonction de recherche pour filtrer les livres
  searchBooks() {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
