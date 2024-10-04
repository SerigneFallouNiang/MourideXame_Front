import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategorieService } from '../../../Services/categorie.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../Services/book.service';
import { title } from 'process';


@Component({
  selector: 'app-add-roles',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './addLivre.component.html',
  styleUrl: './addLivre.component.css',
})
export class AddLivresComponent implements OnInit {
  bookForm: FormGroup;
  errors: string[] = [];
  isEditMode: boolean = false;
  bookId: string | null = null;
  selectedFile: File | null = null;
  existingImageUrl: string | null = null;
  categories: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private bookService: BookService,
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      image: [null],
      category_id: [null, Validators.required] 
    });
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.loadCategories();

    if (this.bookId) {
      this.isEditMode = true;
      this.loadbook();
    }
  }

loadCategories() {
  console.log('Tentative de récupération des catégories...');
  this.categorieService.getAllCategorie().subscribe(
    (response: any) => {
      console.log('Réponse de l\'API:', response);
      if (response['Catégorie']) {
        this.categories = response['Catégorie'].reverse();
  
        console.log('Catégories:', this.categories);
  
      } else {
        console.log('Aucune catégorie trouvée dans la réponse.');
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  );
}


 loadbook(): void {
  this.bookService.getBookById(this.bookId!).subscribe({
     next: (data: any) => {
        setTimeout(() => {
           this.bookForm.patchValue({
              title: data.book.title,
              description: data.book.description,
              category_id: data.book.category_id
           });

           if (data.book.image) {
              this.existingImageUrl = `${apiUrlStockage}/${data.book.image}`;
           }
        });
     },
     error: (err) => {
        this.handleErrors(err);
        this.toastr.error('Erreur lors du chargement du livre');
     }
  });
}


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      // Vérification du type de fichier
      if (!this.selectedFile.type.startsWith('image/')) {
        this.toastr.error('Veuillez sélectionner un fichier image valide');
        this.selectedFile = null;
        return;
      }
      // Vérification de la taille du fichier (par exemple, limite à 5MB)
      const maxSize = 20 * 1024 * 1024; // 5MB en octets
      if (this.selectedFile.size > maxSize) {
        this.toastr.error('La taille du fichier ne doit pas dépasser 20MB');
        this.selectedFile = null;
        return;
      }
      this.toastr.success('Image sélectionnée avec succès');
    }
  }

  resetForm(): void {
    this.bookForm.reset();
    this.selectedFile = null;
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formData = new FormData();
      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('description', this.bookForm.get('description')?.value);
      formData.append('category_id', this.bookForm.get('category_id')?.value);
      
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } else if (this.existingImageUrl) {
        formData.append('existing_image', this.existingImageUrl);
      }
  
      if (this.isEditMode) {
        this.bookService.updateBook(this.bookId!, formData).subscribe({
          next: () => {
            this.toastr.success('Catégorie modifiée avec succès');
            this.router.navigate(['/categories']);
          },
          error: (err) => {
            this.handleErrors(err);
            this.toastr.error('Erreur lors de la modification de la catégorie');
          }
        });
      } else {
        this.bookService.createBook(formData).subscribe({
          next: () => {
            this.toastr.success('Catégorie créée avec succès');
            this.resetForm();
            this.router.navigate(['/categories']);
          },
          error: (err) => {
            this.handleErrors(err);
            this.toastr.error('Erreur lors de la création de la catégorie');
          }
        });
      }
    } else {
      this.toastr.warning('Veuillez remplir correctement tous les champs requis');
      this.errors = ['Veuillez remplir le formulaire correctement.'];
    }
  }

  handleErrors(err: any): void {
    this.errors = err.error.errors ? Object.values(err.error.errors) : [err.error.message];
    // Afficher chaque erreur individuellement dans un toast
    this.errors.forEach(error => {
      this.toastr.error(error as string);
    });
  }
}