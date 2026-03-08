/* ============================================
   CRONO COMPRESSOR — Main JavaScript
   ============================================ */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// FAQ toggle
document.querySelectorAll('.faq-item').forEach(item => {
  const content = item.querySelector('div:last-child');
  const icon = item.querySelector('.fa-chevron-down');

  if (item.classList.contains('open')) {
    content.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  }

  item.querySelector('div:first-child').addEventListener('click', () => {
    const isOpen = content.style.display === 'block';
    content.style.display = isOpen ? 'none' : 'block';
    if (icon) icon.style.transform = isOpen ? 'rotate(0)' : 'rotate(180deg)';
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============ CHATBOT AUTO-OPEN (solo homepage) ============
(function() {
  var isHomepage = window.location.pathname === '/' ||
                   window.location.pathname.endsWith('/index.html') ||
                   window.location.pathname.endsWith('/index.htm') ||
                   window.location.pathname === '';
  if (!isHomepage) return;

  var alreadyShown = sessionStorage.getItem('chatbotAutoOpened');
  if (alreadyShown) return;

  setTimeout(function() {
    var chatWindow = document.getElementById('chatbot-window');
    var chatToggle = document.getElementById('chatbot-toggle');
    if (!chatWindow || chatWindow.classList.contains('open')) return;

    chatWindow.classList.add('open');
    if (chatToggle) chatToggle.classList.add('active');

    // Aggiungi messaggio proattivo di consulenza
    chatbotAddMessage('Ciao! Stai cercando un compressore o hai bisogno di assistenza? <strong>Offriamo una consulenza gratuita</strong> per trovare la soluzione ideale per la tua azienda. Scrivimi o scegli un argomento qui sotto!', false);

    sessionStorage.setItem('chatbotAutoOpened', '1');
  }, 3000);
})();

// ============ CHATBOT ============
const chatbotResponses = {
  'servizi': 'Offriamo: vendita compressori, manutenzione e assistenza 24/7, noleggio a breve/lungo termine, progettazione impianti aria compressa, diagnosi energetica AirScan e ricambi originali. Visita la pagina <a href="servizi.html" style="color:var(--arancione);font-weight:600;">Servizi</a> per i dettagli!',
  'preventivo': 'Per richiedere un preventivo gratuito puoi: chiamarci al <strong>049 555 1234</strong>, scrivere a <strong>info@cronocompressor.it</strong>, oppure compilare il modulo nella pagina <a href="contatti.html" style="color:var(--arancione);font-weight:600;">Contatti</a>. Rispondiamo entro 24 ore!',
  'oil-free': 'I nostri compressori oil-free garantiscono aria compressa 100% pura (Classe 0 ISO 8573-1), ideali per industria alimentare, farmaceutica ed elettronica. Potenze da 15 a 500 kW. Scopri di più nella pagina <a href="prodotti.html#oilfree" style="color:var(--arancione);font-weight:600;">Prodotti</a>.',
  'contatti': 'Puoi contattarci in diversi modi:<br><strong>Tel:</strong> 049 555 1234<br><strong>Email:</strong> info@cronocompressor.it<br><strong>Indirizzo:</strong> Via dell\'Industria, 42 — 35100 Padova<br><strong>Orari:</strong> Lun-Ven 8:00-18:00, Sab 8:00-12:00',
  'manutenzione': 'Offriamo manutenzione ordinaria (ogni 2.000-4.000 ore) e straordinaria con ricambi originali. Contratti fino a 5 anni con tempi di intervento garantiti e assistenza 24/7. <a href="servizi.html#manutenzione" style="color:var(--arancione);font-weight:600;">Maggiori info</a>.',
  'noleggio': 'Noleggiamo compressori e generatori a breve e lungo termine. Il servizio include trasporto, installazione e assistenza tecnica. Ideale per emergenze o picchi di produzione. <a href="servizi.html#noleggio" style="color:var(--arancione);font-weight:600;">Scopri il noleggio</a>.',
  'risparmio': 'Con la diagnosi energetica AirScan individuiamo sprechi e perdite nel vostro impianto. Il risparmio medio raggiunge il 25-35% sulla bolletta annuale! <a href="servizi.html#diagnosi" style="color:var(--arancione);font-weight:600;">Scopri AirScan</a>.',
  'default': 'Grazie per la tua domanda! Per una risposta dettagliata, ti consiglio di contattarci direttamente al <strong>049 555 1234</strong> o via email a <strong>info@cronocompressor.it</strong>. In alternativa, visita la pagina <a href="contatti.html" style="color:var(--arancione);font-weight:600;">Contatti</a>.'
};

function chatbotGetResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('servizi') || lower.includes('cosa fate') || lower.includes('offrite'))
    return chatbotResponses['servizi'];
  if (lower.includes('preventivo') || lower.includes('prezzo') || lower.includes('costo') || lower.includes('quanto'))
    return chatbotResponses['preventivo'];
  if (lower.includes('oil-free') || lower.includes('oil free') || lower.includes('oilfree') || lower.includes('pura'))
    return chatbotResponses['oil-free'];
  if (lower.includes('contatt') || lower.includes('telefon') || lower.includes('email') || lower.includes('orari') || lower.includes('dove'))
    return chatbotResponses['contatti'];
  if (lower.includes('manutenz') || lower.includes('assistenz') || lower.includes('riparaz'))
    return chatbotResponses['manutenzione'];
  if (lower.includes('noleggi') || lower.includes('affitt'))
    return chatbotResponses['noleggio'];
  if (lower.includes('risparm') || lower.includes('energe') || lower.includes('consum') || lower.includes('airscan'))
    return chatbotResponses['risparmio'];
  return chatbotResponses['default'];
}

function chatbotAddMessage(text, isUser) {
  var messagesEl = document.getElementById('chatbot-messages');
  if (!messagesEl) return;
  var msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg ' + (isUser ? 'user' : 'bot');
  var bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = text;
  msgDiv.appendChild(bubble);
  messagesEl.appendChild(msgDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function chatbotSend(text) {
  var quickEl = document.getElementById('chatbot-quick');
  if (quickEl) quickEl.style.display = 'none';
  chatbotAddMessage(text, true);
  // Simulate typing delay
  var typingDiv = document.createElement('div');
  typingDiv.className = 'chat-msg bot chat-typing';
  typingDiv.innerHTML = '<div class="chat-bubble">Sto scrivendo</div>';
  var messagesEl = document.getElementById('chatbot-messages');
  messagesEl.appendChild(typingDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  setTimeout(function() {
    if (typingDiv.parentNode) typingDiv.parentNode.removeChild(typingDiv);
    chatbotAddMessage(chatbotGetResponse(text), false);
  }, 800);
}

function chatbotSendInput() {
  var input = document.getElementById('chatbot-input');
  if (!input) return;
  var text = input.value.trim();
  if (!text) return;
  input.value = '';
  chatbotSend(text);
}
