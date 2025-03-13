import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  onSpeechStart = new EventEmitter<void>();
  onSpeechEnd = new EventEmitter<void>();
  onSpeechPause = new EventEmitter<void>();
  private utterance: SpeechSynthesisUtterance | null = null;
  
  constructor() { }
  
  // Fonction pour lire un texte
  readText(text: string): void {
    // Vérifier si SpeechSynthesis est disponible
    if ('speechSynthesis' in window) {
      // Si déjà en lecture, arrêter d'abord
      this.stopReading();
      
      this.utterance = new SpeechSynthesisUtterance(text);
      
      // Configurer la voix
      this.utterance.rate = 1; // Vitesse de lecture
      this.utterance.pitch = 1; // Tonalité
      this.utterance.volume = 1; // Volume
      
      // Définir la langue (français par défaut basé sur votre interface)
      this.utterance.lang = 'fr-FR';
      
      // Ajouter des événements
      this.utterance.onstart = () => this.onSpeechStart.emit();
      this.utterance.onend = () => this.onSpeechEnd.emit();
      this.utterance.onpause = () => this.onSpeechPause.emit();
      
      // Lire le texte
      window.speechSynthesis.speak(this.utterance);
    } else {
      console.warn('Text-to-Speech n\'est pas supporté sur ce navigateur');
    }
  }
  
  // Fonction pour arrêter la lecture en cours
  stopReading(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.utterance = null;
    }
  }
  
  // Fonction pour mettre en pause/reprendre la lecture
  togglePause(): void {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.pause();
      }
    }
  }
  
  // Vérifier si la lecture est en cours
  isReading(): boolean {
    return 'speechSynthesis' in window && window.speechSynthesis.speaking;
  }
}