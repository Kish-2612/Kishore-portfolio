document.addEventListener("DOMContentLoaded", function () {

  const glow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', e => {
    if (glow) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });

    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
  });

  // ✅ CONTACT FORM

  (function () {
    emailjs.init("mlKE4KLiQJrSffF4P"); // your public key
  })();

  const form = document.getElementById('contactForm');

  if (!form) return; // safety check

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const service = document.getElementById('fservice').value;
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email || !service || !message) {
      alert('Please fill all required fields (*)');
      return;
    }

    const btn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    btn.disabled = true;
    btnText.textContent = 'Sending...';

    emailjs.send('service_7qxq4lh', 'template_zq6o0cx', {
      user_name: name,
      user_email: email,
      phone: document.getElementById('fphone').value,
      service: service,
      message: message
    })
      .then(() => {
        btn.disabled = false;
        btnText.textContent = 'Send Message ✦';

        document.getElementById('successToast').classList.add('show');
        form.reset();

        setTimeout(() => {
          document.getElementById('successToast').classList.remove('show');
        }, 6000);
      })
      .catch((error) => {
        console.error(error);
        btn.disabled = false;
        btnText.textContent = 'Send Message ✦';
        alert('❌ Failed to send email');
      });
  });

});