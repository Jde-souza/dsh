'use strict';

/**
 * Configuration options for the Intersection Observer
 * @type {IntersectionObserverInit}
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

/**
 * Intersection Observer instance to handle scroll animations.
 * Adds the 'visible' class to elements when they enter the viewport.
 * @type {IntersectionObserver}
 */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Ensure the DOM is fully loaded before querying elements
document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isActive);
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Initialize scroll animations
    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));

    /**
     * Initializes the Typewriter effect on the hero section.
     */
    function initTypewriter() {
        const typewriterEl = document.getElementById('typewriter');
        if (!typewriterEl) return;

        const text = typewriterEl.innerText;
        typewriterEl.innerHTML = '<span id="type-text"></span><span class="type-cursor" aria-hidden="true">|</span>';
        const typeText = document.getElementById('type-text');
        const typeCursor = document.querySelector('.type-cursor');
        
        let i = 0;
        const speed = 40; // ms per char
        
        /**
         * Recursive function to type characters one by one.
         */
        function typeWriter() {
            if (i < text.length) {
                typeText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Typewriter done, fade out cursor
                setTimeout(() => {
                    if (typeCursor) {
                        typeCursor.style.animation = 'none';
                        typeCursor.style.transition = 'opacity 0.5s ease';
                        typeCursor.style.opacity = '0';
                        // Remove from DOM after fade out to be 100% sure
                        setTimeout(() => typeCursor.remove(), 500);
                    }
                }, 1500);
                
                // Trigger staggered entrance for subtitle and buttons
                document.querySelectorAll('.hero-animate-element').forEach(el => {
                    el.classList.add('visible');
                });
            }
        }
        
        // Start typing shortly after load
        setTimeout(typeWriter, 500);
    }
    
    initTypewriter();

    /**
     * Handles navbar blur effect on scroll.
     */
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    /**
     * Handles AJAX submission for the contact form.
     */
    const contactForm = /** @type {HTMLFormElement} */ (document.getElementById('contact-form'));
    const successMessage = document.getElementById('form-success');
    const submitBtn = /** @type {HTMLButtonElement} */ (document.getElementById('btn-submit'));

    if (contactForm && successMessage && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                } else {
                    throw new Error('Network response was not ok.');
                }
            }).catch(error => {
                console.error('Error submitting form:', error);
                alert('Hubo un problema de conexión al enviar el formulario. Por favor, intenta de nuevo o escríbenos a nuestro WhatsApp.');
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
                submitBtn.disabled = false;
            });
        });
    }
});

// Share functionality for blog posts
function getArticleUrl() {
    return window.location.href;
}

function showShareToast(message) {
    const toast = document.getElementById('share-toast');
    if(toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

function copyArticleLink() {
    navigator.clipboard.writeText(getArticleUrl()).then(() => {
        showShareToast("¡Enlace copiado al portapapeles!");
    }).catch(() => {
        showShareToast("Error al copiar el enlace.");
    });
}

function copyForInstagram() {
    navigator.clipboard.writeText(getArticleUrl()).then(() => {
        showShareToast("¡Copiado! Abre Instagram para pegarlo en tu historia.");
    }).catch(() => {
        showShareToast("Error al copiar el enlace.");
    });
}

function shareToWhatsApp(e) {
    e.preventDefault();
    const url = encodeURIComponent(getArticleUrl());
    const title = encodeURIComponent(document.title.split('|')[0].trim());
    window.open(`https://api.whatsapp.com/send?text=Mira este artículo de DSH: ${title}%20-%20${url}`, '_blank');
}

function shareToLinkedIn(e) {
    e.preventDefault();
    const url = encodeURIComponent(getArticleUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=600');
}
