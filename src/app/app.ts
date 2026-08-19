import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from './components/header/header';
import {Footer} from './components/footer/footer';
import {Chatbot} from './components/chatbot/chatbot';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Chatbot],
  template: `
    <app-header></app-header>
    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-chatbot></app-chatbot>
  `,
  styleUrl: './app.css',
})
export class App {}
