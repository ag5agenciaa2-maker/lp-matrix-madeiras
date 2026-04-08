# SKILL: Botão WhatsApp com Balão de Mensagem e Notificação Sutil (Premium)

> **Projeto:** Processo de Landing Pages AG5  
> **Versão:** 1.0  
> **Descrição:** Implementação de botão flutuante de WhatsApp com balão de saudação automático (trigger por scroll) e notificação de pendência ("1") após o fechamento.

---

## 🚫 Regra de Ouro (Marketing e Ética)

> [!IMPORTANT]
> **Projetos de Advogados (OAB) e Nichos com Compliance Ético Rigoroso:**
> NÂO utilize a notificação vermelha ("1") após 5 segundos. Nesses casos, a interface deve ser mais sóbria. Utilize **APENAS o balão de mensagem** (bubble) com a saudação automática. A notificação vermelha pode ser considerada "agressiva" ou inapropiada para o tom de autoridade desses profissionais.

---

## 1. Estrutura HTML

Adicione este bloco antes do fechamento da tag `</body>`. Certifique-se de que o link e o número estão configurados corretamente.

```html
<!-- WhatsApp Floating Button with Message Bubble -->
<div class="whatsapp-container">
    <!-- Balão de Mensagem (Saudação) -->
    <div id="whatsapp-message" class="whatsapp-message-bubble shadow-xl">
        <button class="close-whatsapp-bubble"><i class="fa-solid fa-xmark"></i></button>
        Olá! Ficamos felizes em ter você aqui. Estamos à disposição para o que precisar.
    </div>
    
    <!-- Botão Flutuante -->
    <a href="https://wa.me/5521987439102" target="_blank" class="whatsapp-float reveal">
        <!-- Notificação Vermelha (Aparece depois) -->
        <div class="whatsapp-notify">1</div>
        <i class="fa-brands fa-whatsapp"></i>
    </a>
</div>
```

---

## 2. Estilização CSS

Adicione os estilos abaixo ao seu arquivo `style.css`. O design usa glassmorphism e animações suaves.

```css
/* WhatsApp Container */
.whatsapp-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
}

/* Balão de Mensagem */
#whatsapp-message {
    width: 200px;
    position: absolute;
    bottom: 75px;
    right: 0px;
    padding: 12px 28px 12px 14px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    color: #1a1a1b;
    border-radius: 16px;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.4;
    opacity: 0;
    visibility: hidden;
    transform: translateY(12px) scale(0.96);
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.4);
    z-index: 1002;
}

/* Cauda do Balão */
#whatsapp-message::after {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 25px;
    width: 12px;
    height: 12px;
    background: inherit;
    transform: rotate(45deg);
    border-right: 1px solid rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    z-index: -1;
}

#whatsapp-message.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
}

/* Botão Fechar (X) */
.close-whatsapp-bubble {
    position: absolute;
    top: 6px;
    right: 8px;
    background: transparent;
    border: none;
    color: #000;
    cursor: pointer;
    font-size: 10px;
    opacity: 0.5;
    transition: opacity 0.2s;
}

.close-whatsapp-bubble:hover { opacity: 1; }

/* Botão Flutuante (Ícone) */
.whatsapp-float {
    width: 60px;
    height: 60px;
    background-color: #25d366;
    color: #FFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
    transition: all 0.3s ease;
    text-decoration: none;
    position: relative;
    z-index: 1001;
}

.whatsapp-float:hover {
    transform: scale(1.1) rotate(5deg);
    background-color: #128c7e;
}

/* Efeito de Ping/Pulso */
.whatsapp-float::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #25d366;
    z-index: -1;
    animation: whatsapp-pulse 2s infinite;
}

@keyframes whatsapp-pulse {
    0% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1.6); opacity: 0; }
}

/* Notificação Vermelha Sutil */
.whatsapp-notify {
    position: absolute;
    top: -2px;
    right: -2px;
    background-color: #ff3b30;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 11px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transform: scale(0);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 1003;
}

.whatsapp-notify.show {
    opacity: 1;
    transform: scale(1);
}

/* Dark Mode Support */
.dark-mode #whatsapp-message {
    background: rgba(18, 18, 18, 0.8);
    color: #e5e5e7;
    border-color: rgba(255, 255, 255, 0.08);
}

.dark-mode .whatsapp-notify {
    border-color: #000;
}
```

---

## 3. Lógica JavaScript

Adicione este código ao seu `script.js`. A lógica utiliza `IntersectionObserver` para disparar a mensagem quando o usuário atinge uma seção específica.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Seletores
    const whatsappMessage = document.getElementById('whatsapp-message');
    const whatsappNotify = document.querySelector('.whatsapp-notify');
    const closeBubbleBtn = document.querySelector('.close-whatsapp-bubble');
    
    // Alvo para disparar o balão (ex: Seção de Diferenciais ou meio da página)
    const triggerSection = document.getElementById('nossos-diferenciais'); 

    // Função para mostrar a notificação vermelha (5s após o balão sumir)
    function showNotification() {
        setTimeout(() => {
            if (whatsappNotify) whatsappNotify.classList.add('show');
        }, 5000);
    }

    if (triggerSection && whatsappMessage) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Delay inicial para a mensagem aparecer
                    setTimeout(() => {
                        whatsappMessage.classList.add('show');
                        
                        // Auto-esconder após 15 segundos
                        setTimeout(() => {
                            if (whatsappMessage.classList.contains('show')) {
                                whatsappMessage.classList.remove('show');
                                showNotification();
                            }
                        }, 15000);
                    }, 800);
                    
                    // Dispara apenas uma vez
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(triggerSection);
    }

    // Fechamento Manual
    if (closeBubbleBtn && whatsappMessage) {
        closeBubbleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (whatsappMessage.classList.contains('show')) {
                whatsappMessage.classList.remove('show');
                showNotification(); // Notificação aparece 5s depois de fechar
            }
        });
    }
});
```

---

## 4. Checklist de Implementação

- [ ] Incluiu FontAwesome 6 (para o ícone `xmark`).
- [ ] O ID do `triggerSection` no JS corresponde a uma seção real no HTML.
- [ ] O link `wa.me` está correto com o número do cliente.
- [ ] Testou a aparência no Light e Dark mode.
