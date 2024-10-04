import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

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
}