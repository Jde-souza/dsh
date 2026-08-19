import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a routerLink="/" class="flex items-center gap-2 group">
          <span class="text-2xl font-display font-black tracking-tighter text-white group-hover:text-dsh-accent transition-colors">DSH</span>
          <div class="h-4 w-[1px] bg-white/20"></div>
          <span class="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 hidden sm:block">De Souza Hermanos</span>
        </a>

        <nav class="hidden md:flex items-center gap-8">
          <a routerLink="/" routerLinkActive="text-dsh-accent" [routerLinkActiveOptions]="{exact: true}" class="text-sm font-medium hover:text-dsh-accent transition-colors">INICIO</a>
          <a href="#servicios" class="text-sm font-medium hover:text-dsh-accent transition-colors">SERVICIOS</a>
          <a href="#galeria" class="text-sm font-medium hover:text-dsh-accent transition-colors">GALERÍA</a>
          <a routerLink="/blog" routerLinkActive="text-dsh-accent" class="text-sm font-medium hover:text-dsh-accent transition-colors">BLOG</a>
          <a href="#contacto" class="text-sm font-medium hover:text-dsh-accent transition-colors">CONTACTO</a>
        </nav>

        <div class="flex items-center gap-4">
          <a href="#contacto" class="hidden sm:block text-xs font-bold tracking-widest bg-white text-black px-6 py-2 hover:bg-dsh-accent hover:text-white transition-all">
            PRESUPUESTO
          </a>
          <button class="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {}
