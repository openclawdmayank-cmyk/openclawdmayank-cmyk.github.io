document.getElementById('year')?.append(new Date().getFullYear());

const bannerTrack = document.getElementById('bannerTrack');
const bannerItems = [
  'Small batch ceramics • Studio updates weekly',
  'Kyoto calm × Bay Area warmth',
  'New glaze tests in progress',
  'Wheel-thrown forms, hand-finished edges',
  'NABe: daily rituals, elevated quietly',
];

if (bannerTrack) {
  bannerTrack.innerHTML = bannerItems
    .concat(bannerItems)
    .map((item) => `<p class="banner-item"><span class="banner-dot"></span>${item}</p>`)
    .join('');
}

const noteEl = document.getElementById('liveNote');
const footerMood = document.getElementById('footerMood');

const moods = [
  'Live studio mood: calm focus ☕️',
  'Live studio mood: glaze experiments 🎨',
  'Live studio mood: wheel work in motion 🌀',
  'Live studio mood: packing orders carefully 📦',
];

function updateDynamicText() {
  const now = new Date();
  const mood = moods[now.getMinutes() % moods.length];

  if (noteEl) {
    noteEl.textContent = `${mood} • ${now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  }

  if (footerMood) {
    const weekday = now.toLocaleDateString([], { weekday: 'long' });
    footerMood.textContent = `Built with a mobile-first, extensible structure • ${weekday} studio pulse`;
  }
}

updateDynamicText();
setInterval(updateDynamicText, 30000);

const vessel = document.getElementById('vesselShape');
if (vessel && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('pointermove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    vessel.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.15}deg)`;
  });

  window.addEventListener('pointerleave', () => {
    vessel.style.transform = 'translate(0, 0) rotate(0deg)';
  });
}

const glazeGradients = {
  earth: 'radial-gradient(circle at 30% 30%, #d8c4b0, #b48666 55%, #8e5f42 100%)',
  mist: 'radial-gradient(circle at 30% 30%, #ece7e1, #c8bfb6 55%, #9f958b 100%)',
  forest: 'radial-gradient(circle at 30% 30%, #b9cbbf, #6f8f7d 55%, #3f5c4f 100%)',
  night: 'radial-gradient(circle at 30% 30%, #8a8fa0, #4b5160 55%, #171b24 100%)',
};

document.querySelectorAll('.swatch').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach((el) => el.classList.remove('active'));
    button.classList.add('active');
    const glaze = button.dataset.glaze;
    if (vessel && glaze && glazeGradients[glaze]) {
      vessel.style.background = glazeGradients[glaze];
    }
  });
});

const clayTone = document.getElementById('clayTone');
const glazeFinish = document.getElementById('glazeFinish');
const paletteOutput = document.getElementById('paletteOutput');

const comboMap = {
  warm: { matte: 'cozy morning ritual', satin: 'soft dinner hosting', gloss: 'sunlit brunch energy' },
  neutral: { matte: 'quiet modern minimalism', satin: 'balanced everyday elegance', gloss: 'clean gallery look' },
  dark: { matte: 'moody tea ceremony', satin: 'dramatic date-night table', gloss: 'high-contrast statement set' },
};

function updatePaletteSuggestion() {
  if (!clayTone || !glazeFinish || !paletteOutput) return;
  const tone = clayTone.value;
  const finish = glazeFinish.value;
  const vibe = comboMap[tone]?.[finish] || 'studio classic';
  const toneLabel = clayTone.options[clayTone.selectedIndex].text;
  const finishLabel = glazeFinish.options[glazeFinish.selectedIndex].text;
  paletteOutput.textContent = `Palette vibe: ${toneLabel} + ${finishLabel} = ${vibe}.`;
}

clayTone?.addEventListener('change', updatePaletteSuggestion);
glazeFinish?.addEventListener('change', updatePaletteSuggestion);
updatePaletteSuggestion();

const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const statusDetail = document.getElementById('statusDetail');

function updateBacklogStatus() {
  if (!statusDot || !statusText || !statusDetail) return;

  const hour = new Date().getHours();
  const pseudoBacklog = (hour * 7 + 11) % 21; // deterministic, changes through day

  statusDot.classList.remove('yellow', 'red');

  if (pseudoBacklog <= 7) {
    statusText.textContent = 'Low backlog';
    statusDetail.textContent = `${pseudoBacklog} orders in queue • estimated ship in 1–2 days`;
  } else if (pseudoBacklog <= 14) {
    statusDot.classList.add('yellow');
    statusText.textContent = 'Moderate backlog';
    statusDetail.textContent = `${pseudoBacklog} orders in queue • estimated ship in 2–4 days`;
  } else {
    statusDot.classList.add('red');
    statusText.textContent = 'High backlog';
    statusDetail.textContent = `${pseudoBacklog} orders in queue • estimated ship in 4–6 days`;
  }
}

updateBacklogStatus();
setInterval(updateBacklogStatus, 60000);

const revealEls = document.querySelectorAll('.reveal');
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}
