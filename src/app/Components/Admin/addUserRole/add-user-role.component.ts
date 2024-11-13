import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from '../../../Services/Admin/roles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user-role',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.css']
})
export class AddUserRoleComponent implements OnInit {
  roleForm: FormGroup;
  errors: string[] = [];
  isEditMode: boolean = false;
  roleId: string | null = null;
  permissions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private roleService: RolesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      permissions: [[]]
    });
  }

  ngOnInit(): void {
    this.roleId = this.route.snapshot.paramMap.get('id');
    
    // Charger d'abord toutes les permissions disponibles
    this.loadPermissions().then(() => {
      // Puis charger le rôle si on est en mode édition
      if (this.roleId) {
        this.isEditMode = true;
        this.loadRole();
      }
    });
  }

  loadPermissions(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.roleService.getAllPermissions().subscribe({
        next: (data: any) => {
          this.permissions = data || [];
          resolve();
        },
        error: error => {
          this.toastr.error('Erreur lors de la récupération des permissions');
          reject(error);
        }
      });
    });
  }

  loadRole(): void {
    if (!this.roleId) return;

    this.roleService.getRoleById(this.roleId).subscribe({
      next: (data: any) => {
        // Extraire le role et ses permissions de la réponse
        const { role, permissions } = data;
        
        // Récupérer les IDs des permissions assignées au rôle
        const selectedPermissionIds = permissions.map((p: any) => p.id.toString());
        
        // Mettre à jour le formulaire avec les données du rôle
        this.roleForm.patchValue({
          name: role.name,
          permissions: selectedPermissionIds
        });
      },
      error: (err) => {
        this.toastr.error('Erreur lors du chargement du rôle');
        console.error('Erreur de chargement du rôle:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const formData = this.roleForm.value;

      if (this.isEditMode && this.roleId) {
        this.roleService.updateRole(this.roleId, formData).subscribe({
          next: () => {
            this.toastr.success('Rôle modifié avec succès');
            this.router.navigate(['/roles']);
          },
          error: (err) => {
            // this.toastr.error('Erreur lors de la modification du rôle');
            this.toastr.warning("Vous n'avez pas les permissions nécessaires pour modifier ce rôle.");
            console.error('Erreur de modification:', err);
          }
        });
      } else {
        this.roleService.createRole(formData).subscribe({
          next: () => {
            this.toastr.success('Rôle créé avec succès');
            this.router.navigate(['/roles']);
          },
          error: (err) => {
            this.toastr.error('Erreur lors de la création du rôle');
            console.error('Erreur de création:', err);
          }
        });
      }
    } else {
      this.errors = ['Veuillez remplir correctement tous les champs requis.'];
      this.toastr.warning('Veuillez remplir correctement tous les champs requis');
    }
  }

  isPermissionSelected(permissionId: string): boolean {
    const selectedPermissions = this.roleForm.get('permissions')?.value || [];
    return selectedPermissions.includes(permissionId.toString());
  }

  onPermissionChange(permissionId: string, event: any): void {
    const selectedPermissions = this.roleForm.get('permissions')?.value || [];
    if (event.target.checked) {
      if (!selectedPermissions.includes(permissionId.toString())) {
        selectedPermissions.push(permissionId.toString());
      }
    } else {
      const index = selectedPermissions.indexOf(permissionId.toString());
      if (index > -1) {
        selectedPermissions.splice(index, 1);
      }
    }
    this.roleForm.patchValue({ permissions: selectedPermissions });
  }
}