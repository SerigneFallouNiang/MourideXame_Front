import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgModule, OnInit, PLATFORM_ID } from '@angular/core';
import { NavbarApprenantComponent } from '../../heritage/navbar-apprenant/navbar-apprenant.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../Services/book.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-xassidas-liste',
  standalone: true,
  imports: [CommonModule,NavbarApprenantComponent,FormsModule, TranslateModule],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent implements OnInit{

  // les variable déclarer 
  isListView: boolean = true;
  isMobile: boolean = false;
  isDesktop: boolean = true;
  isPaginate: boolean = true;
// la declaration des variables 
books: any[] = [];
 // Pour stocker les livres de la page actuelle
pagedBooks: any[] = [];
// Pour stocker les résultats filtrés
filteredBooks: any[] = []; 
categoryName: string = '';
messageImage: string = "Aucune image pour ce categorie";
// Variable pour le terme de recherche
searchTerm: string = ''; 

showEmptyHistoryAlert: boolean = false;

 // Pagination variables
 currentPage: number = 1;
 itemsPerPage: number = 8;
 totalItems: number = 0;



// fonction toggle pour l'affichage des section et des card en mobile 
  toggleView(): void {
    // Appliquer la bascule seulement si l'appareil est mobile
    if (this.isMobile) {
      this.isListView = !this.isListView;
    }
  }


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router:Router,
    private breakpointObserver: BreakpointObserver,
    private translate: TranslateService
  ) {

  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   const categoryId = params['id'];
      this.loadBooks();
      this.filteredBooks = this.books;
      //pour suivre la taille de l'ecran s'il est desktop
    
    // });

    //manipulation de l'affichage en mode mobile
    this.breakpointObserver.observe([Breakpoints.Handset])
    .subscribe(result => {
      this.isMobile = result.matches;
    });
    if (isPlatformBrowser(this.platformId)) {
    this.checkIfDesktop();
    window.addEventListener('resize', () => this.checkIfDesktop());
    //nombreElementPagination
    this.paginateNomber();
    window.addEventListener('resize', () => this.paginateNomber());
  }
}

  checkIfDesktop() {
    if (isPlatformBrowser(this.platformId)) {
    this.isDesktop = window.innerWidth > 1024;
  }
}

  paginateNomber() {
    //   this.isDesktop = window.innerWidth > 1024;
    //  this.itemsPerPage = 10;
      const isLargeScreen = window.innerWidth > 1400;
      this.isPaginate = isLargeScreen;
      this.itemsPerPage = isLargeScreen ? 10 : 8;
      this.applyPagination(); 
    }


  // Méthode pour récupérer les livres directement sans catégorie
  loadBooks() {
    this.bookService.getHistoryUser().subscribe(
      (data: any) => {
        this.books = data.books;
        this.filteredBooks = this.books;
        this.totalItems = this.books.length;
        
        // Vérifier si l'historique est vide
        if (!this.books || this.books.length === 0) {
          this.showEmptyHistoryAlert = true;
        } else {
          this.showEmptyHistoryAlert = false;
          // Mettre à jour les images des livres
          this.books.forEach(book => {
            if (book.image) {
              book.image = `${apiUrlStockage}/${book.image}`;
            } else {
              this.messageImage = "Aucune image disponible";
            }
          });
          this.applyPagination();
        }
      },
      error => {
        console.error('Erreur lors de la récupération des livres:', error);
        this.showEmptyHistoryAlert = true;
      }
    );
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', () => this.checkIfDesktop());
      window.removeEventListener('resize', () => this.paginateNomber());
    }
  }
  // loadBooks() {
  //   this.bookService.getHistoryUser().subscribe(
  //     (data: any) => {
  //       this.books = data.books;
  //       this.filteredBooks = this.books;
  //       this.totalItems = this.books.length;
  //       this.applyPagination();

  //       // Mettre à jour les images des livres
  //       this.books.forEach(book => {
  //         if (book.image) {
  //           book.image = `${apiUrlStockage}/${book.image}`;
  //         } else {
  //           this.messageImage = "Aucune image disponible";
  //         }
  //       });
  //     },
  //     error => {
  //       console.error('Erreur lors de la récupération des livres:', error);
  //     }
  //   );
  // }

  //les methode de la pagination
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedBooks = this.books.slice(startIndex, endIndex);
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

  // fin methode pagination 


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
