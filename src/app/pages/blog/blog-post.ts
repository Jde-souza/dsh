import { Component, inject, signal, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  encapsulation: ViewEncapsulation.None,
  template: `
    <section class="min-h-screen pt-32 pb-20 bg-dsh-dark">
      <div class="max-w-4xl mx-auto px-6">
        @if (loading()) {
          <div class="flex justify-center py-20">
            <div class="w-12 h-12 border-4 border-dsh-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        } @else if (error()) {
          <div class="text-center py-20">
            <h2 class="text-3xl text-white mb-4">Artículo no encontrado</h2>
            <a routerLink="/blog" class="text-dsh-accent hover:underline">Volver al blog</a>
          </div>
        } @else {
          <article class="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <a routerLink="/blog" class="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white/40 hover:text-white transition-colors mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
              VOLVER
            </a>
            
            <div class="mb-12">
              <span class="text-xs font-bold tracking-[0.3em] text-dsh-orange uppercase mb-4 block">{{ postData()?.category }}</span>
              <h1 class="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">
                {{ postData()?.title }}
              </h1>
              <div class="flex items-center gap-4 text-sm text-white/60">
                <span>{{ postData()?.date | date:'mediumDate' }}</span>
                <span class="w-1 h-1 bg-white/20 rounded-full"></span>
                <span>Por <span class="text-white">{{ postData()?.author }}</span></span>
              </div>
            </div>

            @if (postData()?.thumbnail) {
              <div class="aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-white/5">
                <img [src]="postData()?.thumbnail" [alt]="postData()?.title" class="w-full h-full object-cover">
              </div>
            }

            <div class="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-dsh-accent prose-img:rounded-xl" [innerHTML]="content()"></div>
          </article>
        }
      </div>
    </section>
  `,
  styles: [`
    .prose h2 { color: white; margin-top: 2rem; margin-bottom: 1rem; font-size: 1.875rem; font-weight: 700; }
    .prose h3 { color: white; margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.5rem; font-weight: 600; }
    .prose p { color: rgba(255, 255, 255, 0.7); line-height: 1.8; margin-bottom: 1.25rem; }
    .prose ul { list-style-type: disc; padding-left: 1.5rem; color: rgba(255, 255, 255, 0.7); margin-bottom: 1.25rem; }
    .prose li { margin-bottom: 0.5rem; }
    .prose blockquote { border-left: 4px solid var(--color-dsh-accent, #3b82f6); padding-left: 1rem; font-style: italic; color: rgba(255, 255, 255, 0.8); }
    .prose img { width: 100%; border-radius: 0.75rem; margin: 2rem 0; }
  `]
})
export class BlogPost implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  loading = signal(true);
  error = signal(false);
  content = signal<SafeHtml>('');
  postData = signal<any>(null);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadPost(slug);
      }
    });
  }

  private loadPost(slug: string) {
    this.loading.set(true);
    // Obtener los metadatos desde el index
    this.http.get<any[]>('/content/blog-index.json').subscribe({
      next: (index) => {
        const postMeta = index.find(p => p.slug === slug);
        if (postMeta) {
          this.postData.set(postMeta);
          // Obtener el markdown crudo
          this.http.get(`/content/blog/${slug}.md`, { responseType: 'text' }).subscribe({
            next: async (md) => {
              // Extraer el cuerpo (remover frontmatter)
              const body = md.replace(/---[\s\S]*?---/, '');
              const parsed = await marked.parse(body);
              this.content.set(this.sanitizer.bypassSecurityTrustHtml(parsed));
              this.loading.set(false);
            },
            error: () => {
              this.error.set(true);
              this.loading.set(false);
            }
          });
        } else {
          this.error.set(true);
          this.loading.set(false);
        }
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}
