const vehicles = new Map([
  ['range-rover', ['Range Rover Sport', 'SUV', 68400, 2, 6, 'The Range Rover Sport combines a raised driving position and a spacious cabin with the footprint of a large SUV. When comparing examples, check the seating configuration, boot access and which driver assistance features are fitted.']],
  ['bmw', ['BMW 3 Series', 'Saloon', 52700, 3, 3, 'The 3 Series is an executive saloon with a separate boot and a driver-focused dashboard. Check the engine, trim and parking equipment on the specific car, as these vary by version.']],
  ['mini', ['MINI Cooper', 'Hatchback', 41600, 2, 3, 'The MINI Cooper pairs a compact footprint with a distinctive cabin. It suits everyday urban trips. Check the door configuration, rear-seat space and infotainment on the example you view.']],
  ['porsche', ['Porsche 718 Cayman', 'Coupé', 34900, 2, 6, 'The 718 Cayman is a two-seat, mid-engined sports coupé with storage at both ends. Ask for details of scheduled maintenance and check which gearbox and suspension options are fitted.']],
  ['audi', ['Audi A6 Avant', 'Estate', 76200, 3, 6, 'The A6 Avant offers the cabin of an executive car with the load space of an estate. The large tailgate makes it easier to load bulky luggage. Compare the engine and equipment on the specific vehicle.']],
  ['polestar', ['Polestar 2', 'Electric fastback', 28600, 2, 6, 'The Polestar 2 is an electric fastback with a liftback boot and a minimalist dashboard. Confirm battery capacity, charging capability and the condition of any included charging cables.']],
  ['mercedes', ['Mercedes-Benz A-Class', 'Hatchback', 57100, 3, 3, 'The A-Class hatchback combines compact dimensions with a modern cabin. Confirm the display, parking and driver assistance equipment against the actual trim and model year.']],
  ['jaguar', ['Jaguar F-Type', 'Coupé', 39200, 2, 6, 'The F-Type is a two-seat sports coupé with a long bonnet and a low driving position. Ask about servicing, tyre condition and the engine and drivetrain fitted to the vehicle.']]
]);

const key = new URLSearchParams(location.search).get('model');
const vehicle = vehicles.get(key);
const $ = s => document.querySelector(s);

if (!vehicle) {
  $('#missing').hidden = false;
} else {
  const [model, body, km, owners, months, description] = vehicle;
  const miles = Math.round(km / 1.609344 / 100) * 100;
  const fmt = new Intl.NumberFormat('en-GB');
  document.title = `${model} | Alexa Motors Ltd`;
  $('#model').textContent = model;
  $('#crumb').textContent = model;
  $('#body-tag').textContent = `${body} · Sample listing`;
  $('#description').textContent = description;
  $('#listing').hidden = false;

  const warranty = key === 'polestar' ? 'Electric drive unit' : 'Transmission';
  $('#warranty-heading').textContent = `Example ${warranty.toLowerCase()} warranty`;
  $('#warranty').textContent = `This example shows ${months} months of ${warranty.toLowerCase()} cover. Confirm covered components, exclusions and claim limits for the actual vehicle before purchase.`;
  for (const [label, value] of [['Body style', body], ['Miles driven', `${fmt.format(miles)} mi`], ['Previous owners', owners], ['Example warranty', `${months} months · ${warranty}`]]) {
    const row = document.createElement('div');
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.textContent = value;
    row.append(dt, dd);
    $('#specs').append(row);
  }
  const services = key === 'polestar'
    ? ['Scheduled inspection', 'Cabin filter and brake check', 'Tyres and charging inspection']
    : ['Oil and filter service', 'Scheduled service and inspection', 'Annual service and brake check'];
  [0.3, 0.62, 0.91].forEach((f, i) => {
    const p = document.createElement('p');
    const s = document.createElement('strong');
    s.textContent = `${fmt.format(Math.round(miles * f / 100) * 100)} mi`;
    p.append(s, document.createTextNode(services[i]));
    $('#service').append(p);
  });

  const photos = [
    ['Front angle', `assets/${key}.webp`],
    ['Rear angle', `assets/${key}-rear-angle.webp`],
    ['Side profile', `assets/${key}-side.webp`],
    ['Front view', `assets/${key}-front.webp`],
    ['Rear view', `assets/${key}-rear.webp`],
    ['Dashboard', `assets/${key}-dashboard.webp`],
    ['Driver’s view', `assets/${key}-driver.webp`],
    ['Seats', `assets/${key}-seats.webp`],
    [key === 'polestar' ? 'Under bonnet (EV)' : 'Engine bay', `assets/${key}-engine.webp`]
  ];
  const thumbs = $('.thumbs');
  const thumbButtons = photos.map(([label, src], i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Show ${label.toLowerCase()}`);
    b.innerHTML = `<img src="${src}" alt="" loading="lazy" width="96" height="64">`;
    thumbs.append(b);
    return b;
  });
  const slider = makeSlider($('#gallery-slider'), photos.map(([label, src], i) =>
    `<img src="${src}" alt="${model}, ${label.toLowerCase()}" ${i ? 'loading="lazy"' : ''} width="512" height="341"><div class="slide-cap"><div><small>${label}</small></div></div>`), {
    onChange: i => thumbButtons.forEach((b, n) => {
      b.setAttribute('aria-current', String(n === i));
      if (n === i) thumbs.scrollTo({ left: b.offsetLeft - thumbs.offsetLeft - (thumbs.clientWidth - b.clientWidth) / 2, behavior: 'smooth' });
    })
  });
  thumbButtons.forEach((b, i) => b.addEventListener('click', () => slider.go(i)));
  document.querySelector('#v-message').placeholder = `I'm interested in the ${model} — is it available for a viewing?`;
  wireEnquiry($('#vehicle-form'), { model, _subject: `Enquiry: ${model} – Alexa Motors` });
}
