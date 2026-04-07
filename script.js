/**
 * MATRIX MADEIRAS - TIMBER INDUSTRIAL
 * JavaScript Vanilla ES6
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // NAVBAR SCROLL EFFECT - Otimizado com throttle
    // ========================================
    const navbar = document.getElementById('navbar');
    let ticking = false;
    
    const handleNavbarScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 80) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    
    // ========================================
    // MOBILE NAVIGATION - DRAWER PREMIUM
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerClose = document.getElementById('drawerClose');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    
    function openDrawer() {
        if (drawer && drawerOverlay) {
            drawer.classList.add('active');
            drawerOverlay.classList.add('active');
            document.body.classList.add('drawer-open');
            navToggle.classList.add('active');
        }
    }
    
    function closeDrawer() {
        if (drawer && drawerOverlay) {
            drawer.classList.remove('active');
            drawerOverlay.classList.remove('active');
            document.body.classList.remove('drawer-open');
            navToggle.classList.remove('active');
        }
    }
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            if (drawer.classList.contains('active')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }
    
    if (drawerClose) {
        drawerClose.addEventListener('click', closeDrawer);
    }
    
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }
    
    // Close drawer when clicking on a link
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });
    
    // Close drawer on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('active')) {
            closeDrawer();
        }
    });
    
    // ========================================
    // INTERSECTION OBSERVER - SCROLL ANIMATIONS
    // ========================================
    
    // Zig-zag items animation
    const zigzagItems = document.querySelectorAll('.zigzag-item');
    
    const zigzagObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                zigzagObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    zigzagItems.forEach(item => {
        zigzagObserver.observe(item);
    });
    
    // Generic reveal animations
    const revealElements = document.querySelectorAll('.section-header, .pain-box, .solution-box, .encantamento-text, .encantamento-image, .sobre-content, .counter-item, .faq-item, .localizacao-info, .localizacao-mapa, .cta-final-text, .cta-final-form');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80); // Stagger effect
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // ========================================
    // COUNTERS ANIMATION
    // ========================================
    const counters = document.querySelectorAll('.counter-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-in-out function
            const easeInOut = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            const currentValue = Math.floor(easeInOut * target);
            counter.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateCounter(entry.target);
                }, index * 150); // Stagger 150ms
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // ========================================
    // DEPOIMENTOS CAROUSEL
    // ========================================
    const carouselTrack = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.depoimento-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    const showCard = (index) => {
        // Hide all cards
        cards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Show current card with fade effect
        setTimeout(() => {
            cards[index].classList.add('active');
        }, 50);
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    };
    
    const nextCard = () => {
        const newIndex = (currentIndex + 1) % totalCards;
        showCard(newIndex);
    };
    
    const prevCard = () => {
        const newIndex = (currentIndex - 1 + totalCards) % totalCards;
        showCard(newIndex);
    };
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevCard);
        nextBtn.addEventListener('click', nextCard);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showCard(index);
        });
    });
    
    // Auto-advance carousel every 6 seconds
    setInterval(nextCard, 6000);
    
    // ========================================
    // VIDEO SOUND CONTROL
    // ========================================
    const videoSoundBtn = document.getElementById('videoSoundBtn');
    const videoSoundBtnDesktop = document.getElementById('videoSoundBtnDesktop');
    const heroVideo = document.querySelector('.hero-video-right');
    
    function updateSoundButtons(isMuted) {
        const buttons = [videoSoundBtn, videoSoundBtnDesktop].filter(btn => btn !== null);
        buttons.forEach(btn => {
            if (isMuted) {
                btn.classList.remove('active');
                if (btn.querySelector('.sound-text')) {
                    btn.querySelector('.sound-text').textContent = 'Ativar som';
                }
            } else {
                btn.classList.add('active');
                if (btn.querySelector('.sound-text')) {
                    btn.querySelector('.sound-text').textContent = 'Desativar som';
                }
            }
        });
    }
    
    if (heroVideo) {
        const handleSoundToggle = () => {
            const isMuted = heroVideo.muted;
            
            if (isMuted) {
                heroVideo.muted = false;
                updateSoundButtons(false);
            } else {
                heroVideo.muted = true;
                updateSoundButtons(true);
            }
        };
        
        if (videoSoundBtn) {
            videoSoundBtn.addEventListener('click', handleSoundToggle);
        }
        
        if (videoSoundBtnDesktop) {
            videoSoundBtnDesktop.addEventListener('click', handleSoundToggle);
        }
    }
    
    // ========================================
    // DRONE VIDEO LOOP CONTROL
    // ========================================
    const droneVideo = document.getElementById('droneVideo');
    
    if (droneVideo) {
        // Quando os metadados do vídeo carregarem, definir o tempo de corte
        droneVideo.addEventListener('loadedmetadata', () => {
            const videoDuration = droneVideo.duration;
            const cutTime = videoDuration - 7; // Cortar os últimos 7 segundos
            
            // Monitorar o tempo atual do vídeo
            droneVideo.addEventListener('timeupdate', () => {
                if (droneVideo.currentTime >= cutTime) {
                    droneVideo.currentTime = 0; // Voltar ao início
                    droneVideo.play();
                }
            });
        });
    }
    
    // ========================================
    // FORM HANDLING - Padrão AG5 (Adaptado)
    // ========================================
    const orcamentoForm = document.getElementById('orcamentoForm');
    
    if (orcamentoForm) {
        orcamentoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const produto = document.getElementById('produto').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Monta a mensagem de forma fluida e natural
            let whatsappText = `Olá! Me chamo ${nome}, acessei o site e quero fazer um pedido.\n\n`;
            
            // Contexto do produto/serviço
            if (produto && produto !== 'Outro / Dúvida geral') {
                whatsappText += `*Pedido:* ${produto}\n`;
            }
            
            // Detalhes da mensagem
            if (mensagem) {
                whatsappText += `*Detalhes:* ${mensagem}\n`;
            }
            
            // Contato
            whatsappText += `\n*Contato:* ${telefone}`;
            whatsappText += `\n*E-mail:* ${email}`;
            
            // Encode and redirect to WhatsApp
            const encodedText = encodeURIComponent(whatsappText);
            window.open(`https://wa.me/5521964236743?text=${encodedText}`, '_blank');
        });
    }
    
    // Phone mask
    const telefoneInput = document.getElementById('telefone');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 10) {
                // (XX) XXXX-XXXX
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            } else {
                // (XX) XXXXX-XXXX
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }
            
            e.target.value = value;
        });
    }
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // INSTAGRAM GRID LAZY LOAD
    // ========================================
    const instagramItems = document.querySelectorAll('.instagram-item');
    
    const instagramObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                instagramObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    instagramItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 400ms ease, transform 400ms ease';
        instagramObserver.observe(item);
    });
    
    // ========================================
    // PARALLAX EFFECT FOR HERO - Otimizado
    // ========================================
    const heroVideoParallax = document.querySelector('.hero-video-right');
    let parallaxTicking = false;
    
    if (heroVideoParallax && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.3;
                    
                    if (rate < window.innerHeight) {
                        heroVideoParallax.style.transform = `translateY(${rate}px)`;
                    }
                    parallaxTicking = false;
                });
                parallaxTicking = true;
            }
        }, { passive: true });
    }
    
    // ========================================
    // BUTTON HOVER EFFECTS
    // ========================================
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 200ms ease';
        });
    });
    
    // ========================================
    // PERFORMANCE: Pause video when not visible
    // ========================================
    const heroSection = document.querySelector('.hero');
    const heroVideoElement = document.querySelector('.hero-video-right');
    
    if (heroVideoElement && 'IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideoElement.play();
                } else {
                    heroVideoElement.pause();
                }
            });
        }, {
            threshold: 0.1
        });
        
        videoObserver.observe(heroSection);
    }
    
    // ========================================
    // IMAGE GALLERY MODAL (POPUP)
    // ========================================
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const captionText = document.getElementById('modalCaption');
    const galleryItems = document.querySelectorAll('.sobre-gallery-item img');
    const closeBtn = document.getElementsByClassName('modal-close')[0];

    if (modal && galleryItems.length > 0) {
        galleryItems.forEach(img => {
            img.parentElement.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = img.src;
                captionText.innerHTML = img.alt;
                document.body.style.overflow = 'hidden'; // Bloquear scroll do fundo
            });
        });

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Reativar scroll
        };

        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }

        // Fechar ao clicar fora da imagem
        window.onclick = (event) => {
            if (event.target == modal) {
                closeModal();
            }
        };

        // Fechar com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }

    // ========================================
    // WHATSAPP FLOATING BUTTON - Message Bubble Logic
    // ========================================
    const whatsappMessage = document.getElementById('whatsapp-message');
    const whatsappNotify = document.querySelector('.whatsapp-notify');
    const closeBubbleBtn = document.querySelector('.close-whatsapp-bubble');
    const whatsappButton = document.querySelector('.btn-flutuante-whatsapp');
    const whatsappConnector = document.getElementById('whatsapp-connector');
    
    // Alvo para disparar o balão: Seção Dor e Solução
    const triggerSection = document.getElementById('pain-solution');
    
    let messageShown = false;
    
    // Função para mostrar a notificação vermelha (5s após o balão sumir)
    function showNotification() {
        setTimeout(() => {
            if (whatsappNotify) whatsappNotify.classList.add('show');
        }, 5000);
    }
    
    // Função para esconder o balão de mensagem
    function hideMessageBubble() {
        if (whatsappMessage && whatsappMessage.classList.contains('show')) {
            whatsappMessage.classList.remove('show');
            if (whatsappConnector) whatsappConnector.classList.remove('show');
            if (whatsappButton) whatsappButton.classList.remove('message-active');
            showNotification();
        }
    }
    
    if (triggerSection && whatsappMessage) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !messageShown) {
                    // Delay inicial para a mensagem aparecer (800ms)
                    setTimeout(() => {
                        whatsappMessage.classList.add('show');
                        if (whatsappConnector) whatsappConnector.classList.add('show');
                        if (whatsappButton) whatsappButton.classList.add('message-active');
                        messageShown = true;
                        
                        // Auto-esconder após 15 segundos
                        setTimeout(() => {
                            hideMessageBubble();
                        }, 15000);
                    }, 800);
                    
                    // Dispara apenas uma vez
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(triggerSection);
    }
    
    // Fechamento Manual do balão
    if (closeBubbleBtn && whatsappMessage) {
        closeBubbleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hideMessageBubble();
        });
    }
    
    // ========================================
    // CONSOLE LOG - Branding
    // ========================================
    console.log('%c Matrix Madeiras ', 'background: #2B7A1F; color: #fff; font-size: 24px; font-weight: bold; padding: 10px 20px;');
    console.log('%c Timber Industrial - 30 anos de tradição ', 'color: #8B5E1E; font-size: 14px;');
    console.log('%c Desenvolvido por AG5 Agência ', 'color: #C49A3C; font-size: 12px;');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function for performance optimization
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function for scroll events
 */
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce, throttle };
}
