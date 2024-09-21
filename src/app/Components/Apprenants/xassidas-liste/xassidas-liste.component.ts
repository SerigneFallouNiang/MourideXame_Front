import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { NavbarApprenantComponent } from '../../heritage/navbar-apprenant/navbar-apprenant.component';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../Services/book.service';

@Component({
  selector: 'app-xassidas-liste',
  standalone: true,
  imports: [CommonModule,NavbarApprenantComponent],
  templateUrl: './xassidas-liste.component.html',
  styleUrl: './xassidas-liste.component.css'
})
export class XassidasListeComponent implements OnInit{
  isListVisible: boolean = true;

  showList() {
    this.isListVisible = true;
  }

  showCards() {
    this.isListVisible = false;
  } 

  books: any[] = [];
  categoryName: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      this.loadBooks(categoryId);
    });
  }

  loadBooks(categoryId: string) {
    this.bookService.getBooksByCategory(categoryId).subscribe(
      (data: any) => {
        this.books = data.books;
        this.categoryName = data.categoryName;
      },
      error => {
        console.error('Error loading books:', error);
      }
    );
  }
}
