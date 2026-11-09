// Vehicle data — edit these values to match the real cars.
const vehicles = {
  'range-rover': {
    model: 'Range Rover Sport', year: 2018, plate: '68', miles: 42500, owners: 2, fuel: 'Diesel', body: 'SUV',
    engine: '3.0L', gearbox: 'Automatic', doors: 5, seats: 5, colour: 'White', emission: 'Euro 6', warrantyMonths: 6,
    description: 'This 2018 Range Rover Sport combines a commanding driving position with a spacious, premium cabin and the footprint of a large SUV. Powered by a 3.0 litre diesel engine with an automatic gearbox, it suits long motorway journeys as well as family weekends away. The raised seating gives a clear view of the road, and the five-seat layout leaves generous boot space for luggage or sports kit. When comparing examples, check the seating configuration, tailgate operation and which driver assistance features are fitted, as specifications vary between trims.'
  },
  'bmw': {
    model: 'BMW 3 Series', year: 2019, plate: '69', miles: 32700, owners: 3, fuel: 'Diesel', body: 'Saloon',
    engine: '2.0L', gearbox: 'Automatic', doors: 4, seats: 5, colour: 'Blue', emission: 'Euro 6', warrantyMonths: 3,
    description: 'This 2019 BMW 3 Series is an executive saloon with a separate boot and a driver-focused dashboard. Its 2.0 litre diesel engine and automatic gearbox make it well suited to daily commuting and longer journeys alike, balancing performance with economy. Inside, the cabin seats five with a clear, well-laid-out driving position. Check the engine output, trim level and parking equipment on the specific car, as these vary by version.'
  },
  'mini': {
    model: 'MINI Cooper', year: 2020, plate: '70', miles: 25800, owners: 2, fuel: 'Petrol', body: 'Hatchback',
    engine: '1.5L', gearbox: 'Manual', doors: 3, seats: 4, colour: 'Green', emission: 'Euro 6', warrantyMonths: 3,
    description: 'This 2020 MINI Cooper pairs a compact footprint with a distinctive, characterful cabin. The 1.5 litre petrol engine and manual gearbox give it a lively feel around town, and its small size makes parking easy. It suits everyday urban driving and the occasional longer trip. Check the door configuration, rear-seat space and infotainment on the example you view.'
  },
  'porsche': {
    model: 'Porsche 718 Cayman', year: 2017, plate: '17', miles: 21700, owners: 2, fuel: 'Petrol', body: 'Coupé',
    engine: '2.0L', gearbox: 'Automatic', doors: 2, seats: 2, colour: 'Silver', emission: 'Euro 6', warrantyMonths: 6,
    description: 'This 2017 Porsche 718 Cayman is a two-seat, mid-engined sports coupé with storage at both ends. Its 2.0 litre turbocharged petrol engine and automatic gearbox deliver a sharp, engaging drive, while the low, sculpted profile gives it real presence. It is a practical sports car for weekend drives and everyday use. Ask for details of scheduled maintenance and check which gearbox and suspension options are fitted.'
  },
  'audi': {
    model: 'Audi A6 Avant', year: 2018, plate: '18', miles: 47300, owners: 3, fuel: 'Diesel', body: 'Estate',
    engine: '2.0L', gearbox: 'Automatic', doors: 5, seats: 5, colour: 'Grey', emission: 'Euro 6', warrantyMonths: 6,
    description: 'This 2018 Audi A6 Avant offers the refined cabin of an executive car with the load space of an estate. The 2.0 litre diesel engine and automatic gearbox make it a relaxed long-distance cruiser, and the large tailgate makes it easy to load bulky items. It is well suited to families and anyone who needs space without giving up comfort. Compare the engine and equipment on the specific vehicle.'
  },
  'polestar': {
    model: 'Polestar 2', year: 2021, plate: '21', miles: 17800, owners: 2, fuel: 'Electric', body: 'Fastback',
    engine: 'Electric', gearbox: 'Automatic', doors: 5, seats: 5, colour: 'Silver', emission: 'Zero emission', warrantyMonths: 6,
    description: 'This 2021 Polestar 2 is an all-electric fastback with a liftback boot and a clean, minimalist dashboard. It offers smooth, quiet acceleration and zero tailpipe emissions, making it a strong choice for daily commuting and low running costs. The five-seat cabin and practical boot suit everyday family use. Confirm the battery capacity, charging capability and the condition of any included charging cables.'
  },
  'mercedes': {
    model: 'Mercedes-Benz A-Class', year: 2019, plate: '19', miles: 35500, owners: 3, fuel: 'Petrol', body: 'Hatchback',
    engine: '1.3L', gearbox: 'Automatic', doors: 5, seats: 5, colour: 'Grey', emission: 'Euro 6', warrantyMonths: 3,
    description: 'This 2019 Mercedes-Benz A-Class hatchback combines compact dimensions with a modern, premium cabin. Its 1.3 litre petrol engine and automatic gearbox make it easy to drive in town and comfortable on longer trips. Five doors and five seats make it a practical everyday car. Confirm the display, parking and driver assistance equipment against the actual trim and model year.'
  },
  'jaguar': {
    model: 'Jaguar F-Type', year: 2016, plate: '66', miles: 24400, owners: 2, fuel: 'Petrol', body: 'Coupé',
    engine: '3.0L', gearbox: 'Automatic', doors: 2, seats: 2, colour: 'Red', emission: 'Euro 6', warrantyMonths: 6,
    description: 'This 2016 Jaguar F-Type is a British two-seat sports coupé with a long bonnet and a low, purposeful driving position. The 3.0 litre petrol engine and automatic gearbox give strong, smooth performance and a memorable soundtrack. It is a stylish choice for spirited weekend drives. Ask about servicing, tyre condition and the engine and drivetrain fitted to the vehicle.'
  }
};

const icons = {
  mileage: '<path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l4-3"/><path d="M3 12h2M12 3v2M19 12h2"/>',
  reg: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h3"/>',
  owners: '<circle cx="12" cy="8" r="4"/><path d="M5 21v-1a7 7 0 0 1 14 0v1"/>',
  fuel: '<path d="M8 3c2 3 4 5 4 8a4 4 0 0 1-8 0c0-3 2-5 4-8zM17 9c1.2 1.8 2.5 3 2.5 5a2.5 2.5 0 0 1-5 0c0-2 1.3-3.2 2.5-5z"/>',
  body: '<path d="M4 16v-3l2-5h12l2 5v3"/><path d="M3 16h18v3H3z"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',
  engine: '<path d="M4 10h3l2-2h5l2 2h2v8h-2l-2 2H9l-2-2H4z"/><path d="M2 12v4M22 12v4M10 5h4"/>',
  gearbox: '<path d="M6 4v16M12 4v8M18 4v8M6 12h12"/>',
  doors: '<path d="M4 20V9l6-5h10v16z"/><path d="M15 13h2M4 12h16"/>',
  seats: '<path d="M8 3h4l-1 10h6l2 8H8z"/><path d="M6 21h12"/>',
  colour: '<path d="M7 11l6-6 6 6-6 6z"/><path d="M19 15s2 2.5 2 4a2 2 0 0 1-4 0c0-1.5 2-4 2-4z"/><path d="M3 21h10"/>',
  emission: '<path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/><path d="M5 19l8-8"/>'
};

const key = new URLSearchParams(location.search).get('model');
const car = vehicles[key];
const $ = s => document.querySelector(s);

if (!car) {
  $('#missing').hidden = false;
} else {
  const fmt = new Intl.NumberFormat('en-GB');
  const reg = `${car.year} (${car.plate} reg)`;
  const ownerText = `${car.owners} owner${car.owners === 1 ? '' : 's'}`;
  document.title = `${car.year} ${car.model} | Alexa Motors Ltd`;
  $('#model').textContent = car.model;
  $('#crumb').textContent = car.model;
  $('#body-tag').textContent = `${car.year} · ${car.body} · Sample listing`;
  $('#listing').hidden = false;

  for (const [label, value] of [['Registration', reg], ['Mileage', `${fmt.format(car.miles)} miles`], ['Fuel type', car.fuel], ['Gearbox', car.gearbox]]) {
    const row = document.createElement('div');
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.textContent = value;
    row.append(dt, dd);
    $('#specs').append(row);
  }

  const overview = [
    ['mileage', 'Mileage', `${fmt.format(car.miles)} miles`],
    ['reg', 'Registration', reg],
    ['owners', 'Owners', ownerText],
    ['fuel', 'Fuel type', car.fuel],
    ['body', 'Body type', car.body],
    ['engine', 'Engine', car.engine],
    ['gearbox', 'Gearbox', car.gearbox],
    ['doors', 'Doors', String(car.doors)],
    ['seats', 'Seats', String(car.seats)],
    ['colour', 'Body colour', car.colour],
    ['emission', 'Emission class', car.emission]
  ];
  for (const [icon, label, value] of overview) {
    const item = document.createElement('div');
    item.className = 'ov-item';
    item.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[icon]}</svg><div><b></b><span></span></div>`;
    item.querySelector('b').textContent = label;
    item.querySelector('span').textContent = value;
    $('#overview').append(item);
  }

  const desc = $('#description');
  desc.textContent = car.description;
  const more = $('#desc-toggle');
  more.addEventListener('click', () => {
    const open = desc.classList.toggle('open');
    more.setAttribute('aria-expanded', String(open));
    more.querySelector('span').textContent = open ? 'Show less' : 'Read full description';
  });

  const warranty = car.fuel === 'Electric' ? 'electric drive unit' : 'transmission';
  $('#warranty-heading').textContent = `Example ${warranty} warranty`;
  $('#warranty').textContent = `This example shows ${car.warrantyMonths} months of ${warranty} cover. Confirm covered components, exclusions and claim limits for the actual vehicle before purchase.`;
  const services = car.fuel === 'Electric'
    ? ['Scheduled inspection', 'Cabin filter and brake check', 'Tyres and charging inspection']
    : ['Oil and filter service', 'Scheduled service and inspection', 'Annual service and brake check'];
  [0.3, 0.62, 0.91].forEach((f, i) => {
    const p = document.createElement('p');
    const s = document.createElement('strong');
    s.textContent = `${fmt.format(Math.round(car.miles * f / 100) * 100)} mi`;
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
    [car.fuel === 'Electric' ? 'Under bonnet (EV)' : 'Engine bay', `assets/${key}-engine.webp`]
  ];
  const thumbs = $('.thumbs');
  const thumbButtons = photos.map(([label, src]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Show ${label.toLowerCase()}`);
    b.innerHTML = `<img src="${src}" alt="" loading="lazy" width="96" height="64">`;
    thumbs.append(b);
    return b;
  });
  const slider = makeSlider($('#gallery-slider'), photos.map(([label, src], i) =>
    `<img src="${src}" alt="${car.model}, ${label.toLowerCase()}" ${i ? 'loading="lazy"' : ''} width="512" height="341"><div class="slide-cap"><div><small>${label}</small></div></div>`), {
    onChange: i => thumbButtons.forEach((b, n) => {
      b.setAttribute('aria-current', String(n === i));
      if (n === i) thumbs.scrollTo({ left: b.offsetLeft - thumbs.offsetLeft - (thumbs.clientWidth - b.clientWidth) / 2, behavior: 'smooth' });
    })
  });
  thumbButtons.forEach((b, i) => b.addEventListener('click', () => slider.go(i)));
  $('#v-message').placeholder = `I'm interested in the ${car.year} ${car.model} — is it available for a viewing?`;
  wireEnquiry($('#vehicle-form'), { model: `${car.year} ${car.model}`, _subject: `Enquiry: ${car.year} ${car.model} – Alexa Motors` });
}
