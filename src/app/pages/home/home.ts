import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070" 
          alt="Concert Stage" 
          class="w-full h-full object-cover opacity-30"
          referrerpolicy="no-referrer"
        >
        <div class="absolute inset-0 bg-gradient-to-b from-dsh-dark via-transparent to-dsh-dark"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span class="inline-block text-xs font-bold tracking-[0.5em] text-dsh-accent uppercase mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          TECHNICAL PRODUCTION EXCELLENCE
        </span>
        <h1 class="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000">
          DSH: ELEVAMOS LA <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-dsh-accent to-blue-400">EXPERIENCIA</span> DE TUS <br>
          EVENTOS
        </h1>
        <p class="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          Ingeniería en sonido, iluminación profesional y soluciones visuales con el respaldo de la hermandad.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <button class="btn-primary w-full sm:w-auto">EMPIEZA TU PROYECTO</button>
          <button class="btn-outline w-full sm:w-auto">VER EQUIPAMIENTO</button>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span class="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <div class="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="servicios" class="py-32 bg-dsh-dark relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div class="max-w-xl">
            <h2 class="text-4xl md:text-6xl mb-6">NUESTROS SERVICIOS</h2>
            <div class="h-1 w-24 bg-dsh-orange"></div>
          </div>
          <p class="text-white/40 text-sm uppercase tracking-widest font-medium max-w-xs text-right">
            Sistemas integrados de última generación para espectáculos que demandan precisión absoluta.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Audio -->
          <div class="tech-card group">
            <div class="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-8 group-hover:bg-dsh-accent/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-dsh-accent">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            </div>
            <h3 class="text-xl mb-4">AUDIO PROFESIONAL</h3>
            <p class="text-white/50 text-sm leading-relaxed mb-6">
              Optimización acústica y mezcla digital de alta fidelidad. Expertos en ecosistemas XR18 y Midas para una claridad inigualable.
            </p>
            <div class="flex items-center gap-2 text-[10px] font-bold tracking-widest text-dsh-accent">
              <span>HIGH FIDELITY</span>
              <div class="h-[1px] w-8 bg-dsh-accent/30"></div>
            </div>
          </div>

          <!-- Lighting -->
          <div class="tech-card group">
            <div class="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-8 group-hover:bg-dsh-orange/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-dsh-orange">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            </div>
            <h3 class="text-xl mb-4">ILUMINACIÓN DE ESPECTÁCULO</h3>
            <p class="text-white/50 text-sm leading-relaxed mb-6">
              Diseño lumínico dinámico controlado vía DMX y Art-Net. Atmósferas inmersivas que redefinen el espacio escénico.
            </p>
            <div class="flex items-center gap-2 text-[10px] font-bold tracking-widest text-dsh-orange">
              <span>DYNAMIC DESIGN</span>
              <div class="h-[1px] w-8 bg-dsh-orange/30"></div>
            </div>
          </div>

          <!-- Video -->
          <div class="tech-card group">
            <div class="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-8 group-hover:bg-dsh-accent/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-dsh-accent">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
            <h3 class="text-xl mb-4">PANTALLAS LED Y VIDEO</h3>
            <p class="text-white/50 text-sm leading-relaxed mb-6">
              Sistemas visuales de alto brillo y resolución. Transmisión simultánea y contenido dinámico para impacto masivo.
            </p>
            <div class="flex items-center gap-2 text-[10px] font-bold tracking-widest text-dsh-accent">
              <span>VISUAL IMPACT</span>
              <div class="h-[1px] w-8 bg-dsh-accent/30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section (Hermandad) -->
    <section class="py-32 bg-dsh-surface">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="relative">
            <div class="aspect-square bg-white/5 overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1000" 
                alt="Technical Team" 
                class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerpolicy="no-referrer"
              >
            </div>
            <div class="absolute -bottom-10 -right-10 bg-dsh-dark p-8 border border-white/5 hidden md:block">
              <span class="text-4xl font-black text-white block">15+</span>
              <span class="text-[10px] uppercase tracking-widest text-white/40">Años de trayectoria unificada</span>
            </div>
          </div>
          
          <div>
            <span class="text-xs font-bold tracking-[0.3em] text-dsh-orange uppercase mb-4 block">DIFERENCIAL DSH</span>
            <h2 class="text-4xl md:text-6xl mb-8 leading-tight">
              LA HERMANDAD COMO MOTOR DE <span class="text-dsh-accent">EXCELENCIA</span>
            </h2>
            <div class="space-y-6 text-white/60 leading-relaxed">
              <p>
                Más que un equipo técnico, somos una unidad familiar comprometida con el éxito de cada montaje. Nuestra sinergia operativa minimiza errores y maximiza la respuesta ante desafíos en vivo.
              </p>
              <p>
                En De Souza Hermanos, el compromiso no es solo profesional; es personal. Cada cable conectado y cada luminaria programada lleva el sello de una tradición de perfeccionismo industrial.
              </p>
            </div>
            
            <div class="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 class="text-white font-bold mb-2">COMPROMISO TOTAL</h4>
                <p class="text-xs text-white/40">Atención 24/7 en montaje y ejecución.</p>
              </div>
              <div>
                <h4 class="text-white font-bold mb-2">BACKLINE PROPIO</h4>
                <p class="text-xs text-white/40">Equipamiento de primer nivel siempre disponible.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="py-20 bg-dsh-dark border-y border-white/5">
      <div class="max-w-7xl mx-auto px-6">
        <p class="text-center text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-12">EQUIPAMIENTO & ALIANZAS ESTRATÉGICAS</p>
        <div class="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
          <span class="text-xl font-display font-bold">BEHRINGER</span>
          <span class="text-xl font-display font-bold">MIDAS</span>
          <span class="text-xl font-display font-bold">PIONEER DJ</span>
          <span class="text-xl font-display font-bold">YAMAHA</span>
          <span class="text-xl font-display font-bold">SHURE</span>
        </div>
      </div>
    </section>

    <!-- Gallery Placeholder -->
    <section id="galeria" class="py-32 bg-dsh-dark">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-between items-end mb-16">
          <h2 class="text-4xl md:text-6xl">GALERÍA DE PROYECTOS</h2>
          <div class="flex gap-4">
            <button class="text-xs font-bold tracking-widest bg-white/5 px-4 py-2 hover:bg-white hover:text-black transition-all">TODO</button>
            <button class="text-xs font-bold tracking-widest bg-white/5 px-4 py-2 hover:bg-white hover:text-black transition-all">CONCIERTOS</button>
            <button class="text-xs font-bold tracking-widest bg-white/5 px-4 py-2 hover:bg-white hover:text-black transition-all">CORPORATIVO</button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="aspect-video bg-white/5 overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" alt="Concierto en vivo" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
          </div>
          <div class="aspect-square bg-white/5 overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800" alt="Detalle de iluminación" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
          </div>
          <div class="aspect-video bg-white/5 overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800" alt="Escenario corporativo" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
          </div>
          <div class="aspect-square md:col-span-2 bg-white/5 overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200" alt="Multitud en festival" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
          </div>
          <div class="aspect-video bg-white/5 overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1514525253361-bee8718a300c?auto=format&fit=crop&q=80&w=800" alt="Show de luces" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contacto" class="py-32 bg-dsh-surface relative">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span class="text-xs font-bold tracking-[0.3em] text-dsh-accent uppercase mb-4 block">READY TO START?</span>
            <h2 class="text-5xl md:text-7xl mb-8 leading-tight">
              RESERVA TU <span class="text-dsh-accent">INGENIERÍA</span> DE EVENTO
            </h2>
            <p class="text-white/60 text-lg mb-12">
              Cuéntanos sobre tu visión técnica. Nuestro equipo de ingenieros diseñará la solución perfecta adaptada a tus requerimientos.
            </p>
            
            <div class="space-y-8">
              <div class="flex items-center gap-6">
                <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-dsh-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] uppercase tracking-widest text-white/40 mb-1">EMAIL DIRECTO</p>
                  <p class="text-lg font-bold">contacto&#64;dsh.pro</p>
                </div>
              </div>
              <div class="flex items-center gap-6">
                <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-dsh-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] uppercase tracking-widest text-white/40 mb-1">LÍNEA TÉCNICA</p>
                  <p class="text-lg font-bold">+54 911 3456 7890</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-dsh-dark p-10 rounded-2xl border border-white/5 shadow-2xl">
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="name" class="text-[10px] uppercase tracking-widest font-bold text-white/40">Nombre Completo</label>
                  <input id="name" type="text" placeholder="John Doe" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-dsh-accent transition-colors">
                </div>
                <div class="space-y-2">
                  <label for="email" class="text-[10px] uppercase tracking-widest font-bold text-white/40">Correo Corporativo</label>
                  <input id="email" type="email" placeholder="john&#64;company.com" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-dsh-accent transition-colors">
                </div>
              </div>
              <div class="space-y-2">
                <label for="event-type" class="text-[10px] uppercase tracking-widest font-bold text-white/40">Tipo de Evento</label>
                <select id="event-type" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-dsh-accent transition-colors appearance-none">
                  <option>Concierto / Show en vivo</option>
                  <option>Evento Corporativo</option>
                  <option>Boda / Social Premium</option>
                  <option>Otro</option>
                </select>
              </div>
              <div class="space-y-2">
                <label for="details" class="text-[10px] uppercase tracking-widest font-bold text-white/40">Detalles del Requerimiento</label>
                <textarea id="details" rows="4" placeholder="Describe el tamaño de la audiencia y equipos necesarios..." class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-dsh-accent transition-colors"></textarea>
              </div>
              <button class="btn-primary w-full mt-4">ENVIAR SOLICITUD DE QUOTE</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {}
