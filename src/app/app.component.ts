import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserHistoryModalComponent } from './Components/Admin/Utilisateurs/user-history-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserHistoryModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MourideXam';
}
