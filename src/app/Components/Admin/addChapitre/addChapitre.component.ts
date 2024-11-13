import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategorieService } from '../../../Services/categorie.service';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../Services/book.service';
import { title } from 'process';
import { ChapitreService } from '../../../Services/chapitre.service';


@Component({
  selector: 'app-add-roles',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './addChapitre.component.html',
  styleUrl: './addChapitre.component.css',
})
export class AddChapitresComponent implements OnInit {
  bookForm: FormGroup;
  errors: string[] = [];
  isEditMode: boolean = false;
  chapitreId: string | null = null;
  selectedFile: File | null = null;
  pdfUrl: string | null = null;
  videoUrl: string | null = null;
  chapitres: any[] = []; 
  books: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private chapitreService: ChapitreService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private bookService: BookService,
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      pdf: [null],
      video: [null], 
      book_id: [null, Validators.required],
      lien: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.chapitreId = this.route.snapshot.paramMap.get('id');
    this.loadLivres();

    if (this.chapitreId) {
      this.isEditMode = true;
      this.loadChapitre();
    }
  }

  loadLivres() {
  console.log('Tentative de récupération des Livre...');
  this.bookService.getAllBooks().subscribe(
    (response: any) => {
      console.log('Réponse de l\'API:', response);
      if (response['Livres']) {
        this.books = response['Livres'].reverse();
  
        console.log('Livres:', this.books);
  
      } else {
        console.log('Aucune Livres trouvée dans la réponse.');
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération des Livres:', error);
    }
  );
}


loadChapitre(): void {
  this.chapitreService.getChapitreById(this.chapitreId!).subscribe({
     next: (data: any) => {
        setTimeout(() => {
           this.bookForm.patchValue({
              title: data.Chapitre.title,
              lien: data.Chapitre.lien,
              description: data.Chapitre.description,
              book_id: data.Chapitre.book_id,
              video: data.Chapitre.video_path,
              pdf: data.Chapitre.file_path,
           });

           if (data.Chapitre.file_path) {
            this.pdfUrl = `${apiUrlStockage}/${data.Chapitre.file_path}`;
           }
           if (data.Chapitre.video_path) {
            this.videoUrl = `${apiUrlStockage}/${data.Chapitre.video_path}`;
           }
        });
     },
     error: (err) => {
        // this.handleErrors(err);
        this.toastr.error('Erreur lors du chargement du livre');
     }
  });
}

onVideoSelected(event: any): void {
  const file = event.target.files[0];
  if (file && file.type.startsWith('video/')) {
    if (file.size <= 50 * 1024 * 1024) { // Vérification de la taille (30MB max)
      this.bookForm.patchValue({ video: file });
    } else {
      this.toastr.error('La taille du fichier vidéo ne doit pas dépasser 50MB');
    }
  } else {
    this.toastr.error('Veuillez sélectionner un fichier vidéo valide');
  }
}


onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    if (file.size <= 40 * 1024 * 1024) { // Vérification de la taille (20MB max)
      this.bookForm.patchValue({ pdf: file });
    } else {
      this.toastr.error('La taille du fichier PDF ne doit pas dépasser 40MB');
    }
  } else {
    this.toastr.error('Veuillez sélectionner un fichier PDF valide');
  }
}



  resetForm(): void {
    this.bookForm.reset();
    this.selectedFile = null;
  }

  // onSubmit(): void {
  //   if (this.bookForm.valid) {
  //     const formData = new FormData();
  //     formData.append('title', this.bookForm.get('title')?.value);
  //     formData.append('description', this.bookForm.get('description')?.value);
  //     formData.append('book_id', this.bookForm.get('book_id')?.value);
  
  //     // Ajouter les fichiers PDF et vidéo au formData si présents
  //     const filePath = this.bookForm.get('pdf')?.value;
  //     const videoPath = this.bookForm.get('video')?.value;
  
  //     if (filePath) {
  //       formData.append('pdf', filePath);
  //     }
  //     if (videoPath) {
  //       formData.append('video', videoPath);
  //     }
  
  //     if (this.isEditMode) {
  //       // Modification d'un chapitre existant
  //       this.chapitreService.updateChapitre(this.chapitreId!, formData).subscribe({
  //         next: () => {
  //           this.toastr.success('Chapitre modifié avec succès');
  //           this.router.navigate(['/chapitres']);
  //         },
  //         error: (err) => {
  //           // this.handleErrors(err);
  //           this.toastr.error('Erreur lors de la modification du chapitre');
  //         }
  //       });
  //     } else {
  //       // Création d'un nouveau chapitre
  //       this.chapitreService.createChapitre(formData).subscribe({
  //         next: () => {
  //           this.toastr.success('Chapitre ajouté avec succès');
  //           this.resetForm();
  //           this.router.navigate(['/chapitres']);
  //         },
  //         error: (err) => {
  //           // this.handleErrors(err);
  //           this.toastr.error('Erreur lors de la création du chapitre');
  //         }
  //       });
  //     }
  //   } else {
  //     this.toastr.warning('Veuillez remplir correctement tous les champs requis');
  //   }
  // }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formData = new FormData();
      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('description', this.bookForm.get('description')?.value);
      formData.append('book_id', this.bookForm.get('book_id')?.value);
      formData.append('lien', this.bookForm.get('lien')?.value);
  
      // Ajouter les fichiers PDF et vidéo au formData si présents
      const filePath = this.bookForm.get('pdf')?.value;
      const videoPath = this.bookForm.get('video')?.value;
  
      if (filePath) {
        formData.append('pdf', filePath);
      }
      if (videoPath) {
        formData.append('video', videoPath);
      }
  
      if (this.isEditMode) {
        // Modification d'un chapitre existant
        this.chapitreService.updateChapitre(this.chapitreId!, formData).subscribe({
          next: () => {
            this.toastr.success('Chapitre modifié avec succès');
            this.router.navigate(['/chapitres']);
          },
          error: (err) => {
            // this.handleErrors(err);
            this.toastr.error('Erreur lors de la modification du chapitre');
          }
        });
      } else {
        // Création d'un nouveau chapitre
        this.chapitreService.createChapitre(formData).subscribe({
          next: () => {
            this.toastr.success('Chapitre ajouté avec succès');
            this.resetForm();
            this.router.navigate(['/chapitres']);
          },
          error: (err) => {
            // this.handleErrors(err);
            this.toastr.error('Erreur lors de la création du chapitre');
          }
        });
      }
    } else {
      this.toastr.warning('Veuillez remplir correctement tous les champs requis');
    }
  }
  
}