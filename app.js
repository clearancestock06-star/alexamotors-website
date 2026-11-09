const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-category]')];
const filterStatus = document.querySelector('#filter-status');

for (const filter of filters) {
  filter.addEventListener('click', () => {
    for (const button of filters) {
      button.setAttribute('aria-pressed', String(button === filter));
    }
    for (const card of cards) {
      card.hidden = filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter;
    }
    const count = cards.filter(card => !card.hidden).length;
    const allModels = count === cards.length ? 'all ' : '';
    const modelLabel = count === 1 ? 'model' : 'models';
    filterStatus.textContent = `Showing ${allModels}${count} ${modelLabel}`;
  });
}

const interest = document.querySelector('#interest');
const form = document.querySelector('#enquiry-form');
const draft = document.querySelector('#draft');
const result = document.querySelector('#result');
const status = document.querySelector('#enquiry-status');

form.addEventListener('submit', event => {
  event.preventDefault();
  const budget = document.querySelector('#budget').valueAsNumber;
  const notes = document.querySelector('#notes').value.trim();
  const lines = ['Hello Alexa Motors,', '', 'I would like to enquire about a vehicle.'];
  if (interest.value) lines.push(`Model of interest: ${interest.value}`);
  if (Number.isFinite(budget)) lines.push(`Budget: £${budget.toLocaleString('en-GB')}`);
  if (notes) lines.push(`Preferences: ${notes}`);
  lines.push('', 'Please let me know what options are available. Thank you.');
  draft.value = lines.join('\n');
  result.hidden = false;
  draft.focus();
  status.textContent = 'Your enquiry is ready to copy.';
});

document.querySelector('#copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(draft.value);
    status.textContent = 'Enquiry copied.';
  } catch {
    draft.focus();
    draft.select();
    status.textContent = 'The message is selected. Use your device’s copy command.';
  }
});
