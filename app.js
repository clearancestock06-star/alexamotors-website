const FORM_ENDPOINT = 'https://formsubmit.co/ajax/contact@alexamotors.com';

const cars = [
  ['range-rover', 'Range Rover Sport', 'suv', 'SUV', 'A high driving position and space for family weekends.'],
  ['bmw', 'BMW 3 Series', 'saloon', 'Saloon', 'An executive saloon for daily commutes and longer journeys.'],
  ['mini', 'MINI Cooper', 'hatchback', 'Hatchback', 'A compact hatchback with a distinctive silhouette.'],
  ['porsche', 'Porsche 718 Cayman', 'coupe', 'Coupé', 'A two-seat sports coupé with a low, sculpted profile.'],
  ['audi', 'Audi A6 Avant', 'estate', 'Estate', 'A refined estate with room for luggage and longer trips.'],
  ['polestar', 'Polestar 2', 'electric', 'Electric', 'An electric fastback with a clean, understated design.'],
  ['mercedes', 'Mercedes-Benz A-Class', 'hatchback', 'Hatchback', 'A compact premium hatchback for everyday driving.'],
  ['jaguar', 'Jaguar F-Type', 'coupe', 'Coupé', 'A British sports coupé with a long bonnet and sleek profile.']
];

const arrowIcon = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };

function makeSlider(root, items, { autoplay = 0, onChange } = {}) {
  const track = root.querySelector('.slides');
  const dots = root.querySelector('.dots');
  const counter = root.querySelector('.counter');
  let index = 0, timer = null;
  items.forEach((html, i) => {
    const slide = el('div', 'slide', html);
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-label', `${i + 1} of ${items.length}`);
    track.append(slide);
    if (dots) {
      const d = el('button');
      d.type = 'button';
      d.setAttribute('aria-label', `Go to slide ${i + 1}`);
      d.addEventListener('click', () => { go(i); restart(); });
      dots.append(d);
    }
  });
  const go = i => {
    index = (i + items.length) % items.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    if (dots) [...dots.children].forEach((d, n) => d.setAttribute('aria-current', String(n === index)));
    if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    track.querySelectorAll('.slide').forEach((s, n) => s.setAttribute('aria-hidden', String(n !== index)));
    if (onChange) onChange(index);
  };
  const restart = () => {
    if (!autoplay || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), autoplay);
  };
  root.querySelector('.prev').addEventListener('click', () => { go(index - 1); restart(); });
  root.querySelector('.next').addEventListener('click', () => { go(index + 1); restart(); });
  root.tabIndex = 0;
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { go(index - 1); restart(); }
    if (e.key === 'ArrowRight') { go(index + 1); restart(); }
  });
  let startX = null;
  root.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); restart(); }
    startX = null;
  });
  root.addEventListener('mouseenter', () => clearInterval(timer));
  root.addEventListener('mouseleave', restart);
  go(0);
  restart();
  return { go };
}

const hero = document.querySelector('#hero-slider');
if (hero) {
  makeSlider(hero, cars.map(([key, name, , label], i) => `
    <img src="assets/${key}.webp" alt="${name}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} width="512" height="341">
    <div class="slide-cap"><div><small>${label}</small><h3>${name}</h3></div><a href="vehicle.html?model=${key}">View details →</a></div>`), { autoplay: 5000 });
}

const grid = document.querySelector('#cards');
if (grid) {
  for (const [key, name, cat, label, blurb] of cars) {
    const card = el('article', 'card reveal');
    card.dataset.category = cat;
    card.innerHTML = `
      <a class="media" href="vehicle.html?model=${key}" aria-label="View ${name}"><img src="assets/${key}.webp" alt="${name}" loading="lazy" width="512" height="341"><span class="tag">${label}</span></a>
      <div class="body"><h3>${name}</h3><p>${blurb}</p><a class="more" href="vehicle.html?model=${key}">View vehicle ${arrowIcon}</a></div>`;
    grid.append(card);
  }
  const filters = [...document.querySelectorAll('[data-filter]')];
  const status = document.querySelector('#filter-status');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    let shown = 0;
    grid.querySelectorAll('.card').forEach(c => {
      c.hidden = btn.dataset.filter !== 'all' && c.dataset.category !== btn.dataset.filter;
      if (!c.hidden) shown++;
    });
    status.textContent = `Showing ${shown} of ${cars.length} models`;
  }));
}

function wireEnquiry(form, extra = {}) {
  if (!form) return;
  const status = form.querySelector('.status');
  const button = form.querySelector('button[type=submit]');
  const show = (msg, ok) => { status.hidden = false; status.className = `status ${ok ? 'ok' : 'err'}`; status.textContent = msg; };
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const invalid = [...form.querySelectorAll('[required]')].find(f => !f.value.trim() || (f.type === 'email' && !f.checkValidity()));
    if (invalid) { show('Please fill in your name, a valid email and a message.', false); invalid.focus(); return; }
    if (form._honey && form._honey.value) return;
    const data = Object.fromEntries(new FormData(form));
    Object.assign(data, extra);
    data._replyto = data.email;
    button.disabled = true;
    const label = button.innerHTML;
    button.textContent = 'Sending…';
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || out.success === 'false' || out.success === false) throw new Error(out.message || 'Send failed');
      form.reset();
      show('Thank you — your enquiry has been sent. We will be in touch soon.', true);
    } catch (err) {
      const body = Object.entries(data).filter(([k]) => !k.startsWith('_')).map(([k, v]) => `${k}: ${v}`).join('\n');
      show('Sorry, the form could not send right now. Opening your email app instead…', false);
      location.href = `mailto:contact@alexamotors.com?subject=${encodeURIComponent('Vehicle enquiry')}&body=${encodeURIComponent(body)}`;
    } finally {
      button.disabled = false;
      button.innerHTML = label;
    }
  });
}
wireEnquiry(document.querySelector('#enquiry-form'));

const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 }) : null;
document.querySelectorAll('.reveal').forEach(n => io ? io.observe(n) : n.classList.add('in'));
const y = document.querySelector('#year'); if (y) y.textContent = new Date().getFullYear();
