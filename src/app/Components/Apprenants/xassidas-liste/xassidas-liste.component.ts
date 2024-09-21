import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { NavbarApprenantComponent } from '../../heritage/navbar-apprenant/navbar-apprenant.component';

@Component({
  selector: 'app-xassidas-liste',
  standalone: true,
  imports: [CommonModule,NavbarApprenantComponent],
  templateUrl: './xassidas-liste.component.html',
  styleUrl: './xassidas-liste.component.css'
})
export class XassidasListeComponent {
  isListVisible: boolean = true;

  showList() {
    this.isListVisible = true;
  }

  showCards() {
    this.isListVisible = false;
  } 
}
