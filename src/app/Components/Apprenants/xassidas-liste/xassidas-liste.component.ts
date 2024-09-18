import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-xassidas-liste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xassidas-liste.component.html',
  styleUrl: './xassidas-liste.component.css'
})
export class XassidasListeComponent {
  isListVisible: boolean = false;

  showList() {
    this.isListVisible = true;
  }

  showCards() {
    this.isListVisible = false;
  } 
}
