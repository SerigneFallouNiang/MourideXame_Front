import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategorieService } from '../../../Services/categorie.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-roles',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './addLivre.component.html',
  styleUrl: './addLivre.component.css',
})
export class AddLivresComponent implements OnInit {
  categoryForm: FormGroup;
  errors: string[] = [];
  isEditMode: boolean = false;
  categoryId: string | null = null;
  selectedFile: File | null = null;
  existingImageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.isEditMode = true;
      this.loadCategory();
    }
  }

  loadCategory(): void {
    this.categorieService.getCategoryById(this.categoryId!).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.categoryForm.patchValue({
            name: data.category.name,
            description: data.category.description,
          });
        
          if (data.category.image) {
            this.existingImageUrl = `${apiUrlStockage}/${data.category.image}`;
          }
        });
        // this.toastr.success('Catégorie chargée avec succès');
      },
      error: (err) => {
        this.handleErrors(err);
        this.toastr.error('Erreur lors du chargement de la catégorie');
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
    this.categoryForm.reset();
    this.selectedFile = null;
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append('name', this.categoryForm.get('name')?.value);
      formData.append('description', this.categoryForm.get('description')?.value);
      
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } else if (this.existingImageUrl) {
        formData.append('existing_image', this.existingImageUrl);
      }
  
      if (this.isEditMode) {
        this.categorieService.updateCategory(this.categoryId!, formData).subscribe({
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
        this.categorieService.createCategory(formData).subscribe({
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