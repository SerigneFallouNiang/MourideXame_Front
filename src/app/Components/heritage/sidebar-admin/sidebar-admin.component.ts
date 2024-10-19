import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { apiUrlStockage } from '../../../Services/apiUrlStockage';
import { UserModel } from '../../../Models/user.model';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent implements AfterViewInit {
  constructor(
    private el: ElementRef, private renderer: Renderer2,
    private router: Router,
  private authService: AuthService
) {
  this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

 // Add this method to check if a route is active
 isRouteActive(route: string): boolean {
  return this.router.isActive(route, true);
}

  ngAfterViewInit() {
    this.initSidebarEvents();
  }

  initSidebarEvents() {
    const sidebarDropdowns = this.el.nativeElement.querySelectorAll('.sidebar-dropdown > a');
    sidebarDropdowns.forEach((dropdown: HTMLElement) => {
      this.renderer.listen(dropdown, 'click', (event: Event) => {
        event.preventDefault();
        this.toggleSubmenu(dropdown);
      });
    });

    const closeSidebar = this.el.nativeElement.querySelector('#close-sidebar');
    if (closeSidebar) {
      this.renderer.listen(closeSidebar, 'click', () => {
        this.togglePageWrapper(false);
      });
    }

    const showSidebar = this.el.nativeElement.querySelector('#show-sidebar');
    if (showSidebar) {
      this.renderer.listen(showSidebar, 'click', () => {
        this.togglePageWrapper(true);
      });
    }
  }

  toggleSubmenu(element: HTMLElement) {
    const parent = element.parentElement;
    const submenu = element.nextElementSibling as HTMLElement;

    if (parent && submenu) {
      const isActive = parent.classList.contains('active');
      const allDropdowns = this.el.nativeElement.querySelectorAll('.sidebar-dropdown');
      const allSubmenus = this.el.nativeElement.querySelectorAll('.sidebar-submenu');

      // Close all other submenus
      allDropdowns.forEach((dropdown: HTMLElement) => {
        this.renderer.removeClass(dropdown, 'active');
      });
      allSubmenus.forEach((submenu: HTMLElement) => {
        this.renderer.setStyle(submenu, 'display', 'none');
      });

      if (!isActive) {
        this.renderer.addClass(parent, 'active');
        this.renderer.setStyle(submenu, 'display', 'block');
      }
    }
  }

  togglePageWrapper(show: boolean) {
    const pageWrapper = this.el.nativeElement.querySelector('.page-wrapper');
    if (pageWrapper) {
      if (show) {
        this.renderer.addClass(pageWrapper, 'toggled');
      } else {
        this.renderer.removeClass(pageWrapper, 'toggled');
      }
    }
  }



  //fonction pour les utilisateurs


messageImage: string = "Aucune image pour cette catégorie";
loading: boolean = true;
error: string | null = null;
userConnected: UserModel | null = null;

isBrowser: boolean;




ngOnInit(): void {
  this.loadUserInfo();
}



loadUserInfo() {
  if (this.isBrowser) {
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    this.userConnected = JSON.parse(authUser).user;
  } else {
    this.authService.getProfile().subscribe(
      (user: UserModel) => {
        this.userConnected = user;
        localStorage.setItem("authUser", JSON.stringify({ user }));
      },
      error => {
        console.error("Erreur lors de la récupération des informations de l'utilisateur", error);
      }
    );
  }
}else {
  console.warn('localStorage n\'est pas disponible.');
}
}


//Fonction de la déconnexion
logout() {
  if (confirm('Êtes-vous sûr de vouloir se déconnecter ?')) {
  this.authService.logout();
  localStorage.removeItem("authUser");
  this.userConnected = null;
  this.router.navigateByUrl("/login");
  }
}

//fonction pour la modification du profil utilisateur
editProfile() {
  // Naviguer vers la page de modification du profil
  this.router.navigateByUrl("/edit-profile");
}
//fonctio poir la redirection vers la page de connexion
navigateToLogin() {
  this.router.navigate(['/login']);
}

//fonctio poir la redirection vers la page d'accueil
navigateToAccueil() {
  this.router.navigate(['/accueil']);
}

 //fonctio poir la redirection vers la page historique
 navigateToHistorique() {
  this.router.navigate(['/historique']);
}
}