// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

links.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Forms with an action attribute submit to Formspree via AJAX so visitors
// stay on the page. Forms without one show a "coming soon" message until
// their Formspree endpoint is added.
document.querySelectorAll('form[data-form]').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    const name = form.elements.name?.value?.trim().split(' ')[0] || 'Friend';

    if (!form.action || form.getAttribute('action') === null) {
      status.textContent =
        `Thank you, ${name}! Sign-ups aren't live yet while we finish planning — please check back soon.`;
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = 'Sending…';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        form.reset();
        status.textContent =
          form.dataset.form === 'volunteer'
            ? `Thank you, ${name}! We've received your volunteer sign-up and will be in touch soon.`
            : `Thank you, ${name}! Your signature has been recorded. Omelette's Promise grows stronger with you.`;
      } else {
        const data = await response.json().catch(() => null);
        status.textContent =
          data?.errors?.map((err) => err.message).join(', ') ||
          'Something went wrong — please try again in a moment.';
      }
    } catch {
      status.textContent =
        'Could not reach the server — please check your connection and try again.';
    } finally {
      button.disabled = false;
    }
  });
});

// Donate placeholder
document.querySelectorAll('[data-placeholder="donate"]').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const note = btn.nextElementSibling;
    if (note) {
      note.textContent = 'Online donations are coming soon — thank you for wanting to support Omelette’s Promise!';
      note.style.fontWeight = '600';
    }
  });
});
