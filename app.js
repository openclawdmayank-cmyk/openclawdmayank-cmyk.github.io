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
  const html = bannerItems
    .concat(bannerItems)
    .map((item) => `<p class="banner-item"><span class="banner-dot"></span>${item}</p>`)
    .join('');
  bannerTrack.innerHTML = html;
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
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 10;
    const y = (e.clientY / innerHeight - 0.5) * 10;
    vessel.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.15}deg)`;
  });

  window.addEventListener('pointerleave', () => {
    vessel.style.transform = 'translate(0, 0) rotate(0deg)';
  });
}
