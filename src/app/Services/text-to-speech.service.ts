import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor() { }

  // Fonction pour lire un texte
  readText(text: string): void {
    // Vérifier si SpeechSynthesis est disponible
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Optionnel : Vous pouvez configurer la voix, la vitesse, etc.
      utterance.rate = 1; // Vitesse de lecture (1 est la normale)
      utterance.pitch = 1; // Tonalité de la voix (1 est la normale)
      utterance.volume = 1; // Volume (entre 0 et 1)

      // Lire le texte
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-Speech n\'est pas supporté sur ce navigateur');
    }
  }

  // Fonction pour arrêter la lecture en cours
  stopReading(): void {
    window.speechSynthesis.cancel();
  }
}
