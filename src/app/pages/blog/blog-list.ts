import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  description: string;
  author: string;
  category: string;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="min-h-screen pt-32 pb-20 bg-dsh-dark relative overflow-hidden">
      <!-- Background elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div class="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-dsh-accent/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-dsh-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div class="max-w-xl">
            <span class="text-xs font-bold tracking-[0.3em] text-dsh-accent uppercase mb-4 block animate-in fade-in slide-in-from-bottom-4">ACTUALIDAD</span>
            <h1 class="text-5xl md:text-7xl mb-6 font-black tracking-tighter text-white animate-in fade-in slide-in-from-bottom-8">
              BLOG DSH
            </h1>
            <div class="h-1 w-24 bg-dsh-orange animate-in fade-in slide-in-from-bottom-12"></div>
          </div>
          <p class="text-white/40 text-sm uppercase tracking-widest font-medium max-w-xs md:text-right animate-in fade-in slide-in-from-bottom-8">
            Novedades, tecnología y cultura del mundo de la producción de eventos.
          </p>
        </div>

        @if (loading()) {
          <div class="flex justify-center items-center py-20">
            <div class="w-12 h-12 border-4 border-dsh-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        } @else if (posts().length === 0) {
          <div class="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
            <p class="text-white/60 text-lg">Próximamente estaremos publicando nuestro primer artículo.</p>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (post of posts(); track post.slug) {
              <a [routerLink]="['/blog', post.slug]" class="group block h-full bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-dsh-accent/50 transition-all duration-500 hover:-translate-y-2">
                <div class="aspect-[16/10] bg-black/50 overflow-hidden relative">
                  @if (post.thumbnail) {
                    <img [src]="post.thumbnail" [alt]="post.title" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                  } @else {
                    <div class="absolute inset-0 flex items-center justify-center text-dsh-accent opacity-20 group-hover:opacity-40 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                    </div>
                  }
                  <div class="absolute top-4 left-4 bg-dsh-dark/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-dsh-orange border border-dsh-orange/20">
                    {{ post.category }}
                  </div>
                </div>
                <div class="p-8 flex flex-col h-[calc(100%-auto)]">
                  <div class="flex items-center gap-4 text-xs text-white/40 mb-4">
                    <span>{{ post.date | date:'mediumDate' }}</span>
                    <span class="w-1 h-1 bg-white/20 rounded-full"></span>
                    <span>{{ post.author }}</span>
                  </div>
                  <h2 class="text-2xl font-bold mb-4 text-white group-hover:text-dsh-accent transition-colors">{{ post.title }}</h2>
                  <p class="text-white/60 text-sm leading-relaxed flex-grow line-clamp-3">
                    {{ post.description }}
                  </p>
                  <div class="mt-6 flex items-center gap-2 text-xs font-bold tracking-widest text-white/40 group-hover:text-white transition-colors">
                    <span>LEER MÁS</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 group-hover:translate-x-2 transition-transform"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </div>
                </div>
              </a>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class BlogList implements OnInit {
  private http = inject(HttpClient);
  posts = signal<BlogPost[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.http.get<BlogPost[]>('/content/blog-index.json').subscribe({
      next: (data) => {
        this.posts.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching blog index', err);
        // Fallback for empty state or error
        this.loading.set(false);
      }
    });
  }
}
