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
const get = selector => document.querySelector(selector);

if (!vehicle) {
  get('#missing').hidden = false;
} else {
  const [model, body, km, owners, months, description] = vehicle;
  const miles = Math.round(km / 1.609344 / 100) * 100;
  const format = new Intl.NumberFormat('en-GB');
  document.title = `${model} | Alexa Motors Ltd`;
  get('#model').textContent = model;
  get('#description').textContent = description;
  get('#listing').hidden = false;

  const warranty = key === 'polestar' ? 'Electric drive unit' : 'Transmission';
  get("#warranty-heading").textContent = `Example ${warranty.toLowerCase()} warranty`;
  for (const [label, value] of [
    ['Body style', body],
    ['Miles driven', `${format.format(miles)} mi`],
    ['Previous owners', owners],
    ['Example warranty', `${months} months · ${warranty}`]
  ]) {
    const item = document.createElement('div');
    const title = document.createElement('dt');
    const detail = document.createElement('dd');
    title.textContent = label;
    detail.textContent = value;
    item.append(title, detail);
    get('#specs').append(item);
  }

  const serviceNames = key === 'polestar'
    ? ['Scheduled inspection', 'Cabin filter and brake check', 'Tyres and charging inspection']
    : ['Oil and filter service', 'Scheduled service and inspection', 'Annual service and brake check'];
  const serviceIntervals = [0.3, 0.62, 0.91];
  serviceNames.forEach((name, index) => {
    const row = document.createElement('p');
    const distance = document.createElement('strong');
    distance.textContent = `${format.format(Math.round(miles * serviceIntervals[index] / 100) * 100)} mi`;
    row.append(distance, document.createTextNode(name));
    get('#service').append(row);
  });
  get('#warranty').textContent = `This example shows ${months} months of ${warranty.toLowerCase()} cover. Confirm covered components, exclusions and claim limits for the actual vehicle before purchase.`;

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
  const buttons = photos.map(([label, src]) => {
    const button = document.createElement('button');
    button.type = 'button';
    const thumbnail = document.createElement('img');
    thumbnail.src = src;
    thumbnail.alt = '';
    thumbnail.loading = 'lazy';
    thumbnail.width = 150;
    thumbnail.height = 100;
    const caption = document.createElement('span');
    caption.textContent = label;
    button.append(thumbnail, caption);
    get('.gallery-buttons').append(button);
    return button;
  });
  const showPhoto = index => {
    const [label, src] = photos[index];
    get('#large-photo').src = src;
    get('#large-photo').alt = `${model}, illustrative ${label.toLowerCase()}`;
    get('#large-link').href = src;
    get('#photo-count').textContent = `${index + 1} / ${photos.length}`;
    get('#large-link').setAttribute('aria-label', `Open full-size ${label.toLowerCase()} photo in a new tab`);
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  };
  buttons.forEach((button, i) => button.addEventListener('click', () => showPhoto(i)));
  showPhoto(0);

  const draft = get('#vehicle-draft');
  const status = get('#vehicle-status');
  get('#vehicle-form').addEventListener('submit', event => {
    event.preventDefault();
    const message = get('#message').value.trim();
    if (!message) {
      status.textContent = 'Enter a question to prepare your enquiry.';
      get('#message').focus();
      return;
    }
    const name = get('#name').value.trim();
    draft.value = ['Hello Alexa Motors,', '', `I’m interested in the ${model}.`, message, '', name || 'Thank you.'].join('\n');
    get('#vehicle-result').hidden = false;
    status.textContent = 'Your enquiry is ready to copy.';
    draft.focus();
  });
  get('#vehicle-copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(draft.value);
      status.textContent = 'Enquiry copied.';
    } catch {
      draft.focus();
      draft.select();
      status.textContent = 'The message is selected. Use your device’s copy command.';
    }
  });
}
