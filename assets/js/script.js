(function () {
  'use strict';

  var year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  }, { passive: true });

  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  document.querySelectorAll('#mainNav .nav-link, #mainNav .nav-cta').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < 992 && window.jQuery) jQuery('#mainNav').collapse('hide');
    });
  });

  var partnerForm = document.getElementById('partnerForm');
  if (partnerForm) {
    partnerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var formData = new FormData(partnerForm);
      var message = [
        'Olá, sou uma possível parceira TomVita.',
        'Nome: ' + formData.get('nome'),
        'WhatsApp: ' + formData.get('whatsapp'),
        'Cidade: ' + formData.get('cidade'),
        'Mensagem: ' + (formData.get('mensagem') || 'Gostaria de conhecer a parceria.')
      ].join('\n');
      window.open('https://wa.me/555136711253?text=' + encodeURIComponent(message), '_blank', 'noopener');
    });
  }

  document.querySelectorAll('a[href]').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (!href || href.indexOf('wa.me') !== -1 || link.classList.contains('navbar-brand') || (link.closest('#mainNav') && !link.classList.contains('nav-cta'))) return;
    var label = link.textContent.replace(/\s+/g, ' ').trim();
    var message = 'Olá, vim pelo site da TomVita';
    if (label) message += ' e gostaria de saber mais sobre: ' + label + '.';
    link.setAttribute('href', 'https://wa.me/555136711253?text=' + encodeURIComponent(message));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
  });

  document.querySelectorAll('.btn').forEach(function (button) {
    var whatsapp = button.querySelector('.fa-whatsapp');
    if (!whatsapp) {
      whatsapp = document.createElement('i');
      whatsapp.className = 'fab fa-whatsapp btn-whatsapp-icon';
    } else {
      whatsapp.classList.remove('ml-2');
      whatsapp.classList.add('btn-whatsapp-icon');
    }
    button.prepend(whatsapp);

    var arrow = button.querySelector('.fa-arrow-right');
    if (!arrow) {
      arrow = document.createElement('i');
      arrow.className = 'fas fa-arrow-right btn-arrow-icon';
    } else {
      arrow.classList.remove('ml-2');
      arrow.classList.add('btn-arrow-icon');
    }
    button.append(arrow);
  });
})();
