import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-dsh-dark border-t border-white/5 py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div class="col-span-1 md:col-span-2">
            <span class="text-3xl font-display font-black tracking-tighter text-white mb-6 block">DSH</span>
            <p class="text-white/50 max-w-md leading-relaxed">
              Líderes en producción técnica para eventos en Uruguay. 
              Ingeniería de sonido, iluminación de vanguardia y soluciones visuales de alto impacto.
            </p>
          </div>
          
          <div>
            <h4 class="text-xs font-bold tracking-widest text-white/30 uppercase mb-6">Navegación</h4>
            <ul class="space-y-4 text-sm">
              <li><a href="#" class="hover:text-dsh-accent transition-colors">Inicio</a></li>
              <li><a href="#servicios" class="hover:text-dsh-accent transition-colors">Servicios</a></li>
              <li><a href="#galeria" class="hover:text-dsh-accent transition-colors">Galería</a></li>
              <li><a href="#contacto" class="hover:text-dsh-accent transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-bold tracking-widest text-white/30 uppercase mb-6">Contacto</h4>
            <ul class="space-y-4 text-sm text-white/60">
              <li>Montevideo, Uruguay</li>
              <li>info&#64;dsh.com.uy</li>
              <li>+598 900 000 000</li>
            </ul>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p class="text-xs text-white/30">
            &copy; {{ currentYear }} DSH - De Souza Hermanos. Todos los derechos reservados.
          </p>
          <div class="flex gap-6 text-xs font-bold tracking-widest text-white/30">
            <a href="#" class="hover:text-white transition-colors">INSTAGRAM</a>
            <a href="#" class="hover:text-white transition-colors">FACEBOOK</a>
            <a href="#" class="hover:text-white transition-colors">LINKEDIN</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
  currentYear = new Date().getFullYear();
}
