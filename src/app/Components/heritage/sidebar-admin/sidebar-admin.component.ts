import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent {
  isSidebarActive: boolean = false;
  activeSubMenu: string | null = null;

  openSidebar() {
    this.isSidebarActive = true;
  }

  closeSidebar() {
    this.isSidebarActive = false;
  }

  toggleSubMenu(menu: string) {
    if (this.activeSubMenu === menu) {
      this.activeSubMenu = null;
    } else {
      this.activeSubMenu = menu;
    }
  }

  isSubMenuActive(menu: string): boolean {
    return this.activeSubMenu === menu;
  }
}
