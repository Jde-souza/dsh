import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleGenAI } from "@google/genai";

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed bottom-6 right-6 z-[100]">
      <!-- Chat Toggle Button -->
      <button 
        (click)="toggleChat()"
        class="w-14 h-14 rounded-full bg-dsh-accent text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
      >
        @if (!isOpen()) {
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        }
      </button>

      <!-- Chat Window -->
      @if (isOpen()) {
        <div class="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-dsh-surface border border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <!-- Header -->
          <div class="p-4 bg-dsh-dark border-b border-white/5 flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-dsh-accent/20 flex items-center justify-center text-dsh-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">DSH AI Assistant</h3>
              <p class="text-[10px] text-white/40 uppercase tracking-widest">Online</p>
            </div>
          </div>

          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            @for (msg of messages(); track $index) {
              <div class="flex" [ngClass]="msg.role === 'user' ? 'justify-end' : 'justify-start'">
                <div 
                  class="max-w-[80%] p-3 rounded-xl text-sm leading-relaxed"
                  [ngClass]="msg.role === 'user' ? 'bg-dsh-accent text-white' : 'bg-white/5 text-white/80 border border-white/5'"
                >
                  {{ msg.content }}
                </div>
              </div>
            }
            @if (isLoading()) {
              <div class="flex justify-start">
                <div class="bg-white/5 p-3 rounded-xl flex gap-1">
                  <div class="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
                  <div class="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div class="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            }
          </div>

          <!-- Input -->
          <div class="p-4 border-t border-white/5 bg-dsh-dark">
            <form (submit)="sendMessage($event)" class="flex gap-2">
              <input 
                type="text" 
                [(ngModel)]="userInput" 
                name="userInput"
                placeholder="Pregunta sobre nuestros servicios..."
                class="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-dsh-accent transition-colors"
                [disabled]="isLoading()"
              >
              <button 
                type="submit"
                [disabled]="isLoading() || !userInput.trim()"
                class="bg-dsh-accent text-white p-2 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Chatbot {
  isOpen = signal(false);
  isLoading = signal(false);
  userInput = '';
  messages = signal<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '¡Hola! Soy el asistente virtual de DSH. ¿En qué puedo ayudarte con la producción técnica de tu evento?' }
  ]);

  private ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  async sendMessage(event: Event) {
    event.preventDefault();
    if (!this.userInput.trim() || this.isLoading()) return;

    const userMsg = this.userInput;
    this.userInput = '';
    this.messages.update(prev => [...prev, { role: 'user', content: userMsg }]);
    this.isLoading.set(true);

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `Eres el asistente virtual de DSH (De Souza Hermanos), una empresa de producción técnica de eventos en Montevideo, Uruguay. 
            Ofrecemos Audio Profesional (XR18, Midas), Iluminación DMX y Pantallas LED. 
            Responde de manera profesional, técnica pero amable. 
            Si te preguntan algo fuera de la producción de eventos, redirige amablemente a los servicios de DSH.
            
            Pregunta del usuario: ${userMsg}` }]
          }
        ]
      });

      const aiResponse = response.text || "Lo siento, tuve un problema procesando tu solicitud.";
      this.messages.update(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Chatbot Error:', error);
      this.messages.update(prev => [...prev, { role: 'assistant', content: 'Hubo un error de conexión. Por favor intenta más tarde.' }]);
    } finally {
      this.isLoading.set(false);
    }
  }
}
