// ============================================================
// Demo registry
// ============================================================
const demoData = [
    {
        id: 'scroll-driven-animations',
        title: 'Scroll-Driven Animations',
        icon: '🎞️',
        description: 'Native CSS scroll-driven animations — a reading progress bar and reveal-on-scroll cards driven purely by scroll-timeline, zero JavaScript.',
        category: 'rendering',
        tags: ['CSS', 'scroll-timeline', 'animation-timeline'],
        status: 'stable',
        date: '2025-06-22',
        path: 'demos/scroll-driven-animations/',
        code: `/* Reading progress bar tied to the scroll position */
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

.progress {
  animation: grow auto linear;
  animation-timeline: scroll(root block);
  transform-origin: left;
}

/* Reveal cards as they enter the viewport */
.card {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 35%;
}`
    },
    {
        id: 'container-queries',
        title: 'Container Queries',
        icon: '📐',
        description: 'A single card component that restyles itself based on the width of its container — not the viewport. Drag the slider to resize and watch it adapt.',
        category: 'rendering',
        tags: ['CSS', 'container-query', 'responsive'],
        status: 'stable',
        date: '2025-06-22',
        path: 'demos/container-queries/',
        code: `.wrapper { container-type: inline-size; }

/* Adapt based on the WRAPPER's width, not the screen */
@container (min-width: 480px) {
  .card { grid-template-columns: 160px 1fr; }
}`
    },
    {
        id: 'intersection-observer',
        title: 'Intersection Observer',
        icon: '👁️',
        description: 'Track element visibility efficiently with IntersectionObserver — lazy-reveal items, a live "in view" indicator, and per-element intersection ratios.',
        category: 'apis',
        tags: ['JavaScript', 'IntersectionObserver', 'DOM'],
        status: 'stable',
        date: '2025-06-22',
        path: 'demos/intersection-observer/',
        code: `const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    entry.target.classList.toggle('in-view', entry.isIntersecting);
    ratioLabel.textContent = (entry.intersectionRatio * 100).toFixed(0) + '%';
  }
}, { threshold: [0, 0.25, 0.5, 0.75, 1] });

document.querySelectorAll('.observe').forEach(el => observer.observe(el));`
    },
    {
        id: 'clipboard-share',
        title: 'Clipboard & Web Share',
        icon: '📋',
        description: 'Copy rich text to the clipboard with the async Clipboard API and trigger the native share sheet via the Web Share API, with graceful fallbacks.',
        category: 'apis',
        tags: ['JavaScript', 'Clipboard', 'Web Share'],
        status: 'stable',
        date: '2025-06-22',
        path: 'demos/clipboard-share/',
        code: `// Async Clipboard API
await navigator.clipboard.writeText(text);

// Web Share API (mobile + some desktop)
if (navigator.share) {
  await navigator.share({ title, text, url });
} else {
  // fall back to copying the link
  await navigator.clipboard.writeText(url);
}`
    },
    {
        id: 'particle-field',
        title: 'Canvas Particle Field',
        icon: '✨',
        description: 'A 60fps interactive particle network rendered on a Canvas with requestAnimationFrame, a live FPS meter, and mouse-reactive physics.',
        category: 'performance',
        tags: ['Canvas', 'requestAnimationFrame', 'perf'],
        status: 'stable',
        date: '2025-06-22',
        path: 'demos/particle-field/',
        code: `function loop(now) {
  const fps = 1000 / (now - last);
  last = now;
  ctx.clearRect(0, 0, w, h);
  for (const p of particles) { p.step(); p.draw(ctx); }
  drawLinks(ctx, particles);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);`
    },
    {
        id: 'subtle-crypto',
        title: 'Web Crypto Hashing',
        icon: '🔐',
        description: 'Generate SHA-256 / SHA-1 digests entirely in the browser using SubtleCrypto. Type any text and watch the hash update live — nothing leaves your machine.',
        category: 'security',
        tags: ['JavaScript', 'SubtleCrypto', 'WebCrypto'],
        status: 'stable',
        date: '2025-06-22',
        path: 'demos/subtle-crypto/',
        code: `async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}`
    },
    {
        id: 'json-module-errors',
        title: 'JSON Module Error Sanitization',
        icon: '🐛',
        description: 'A bug reproduction: JSON module import errors are over-sanitized even when CORS would permit detailed parse errors. Compare same-origin vs cross-origin imports live.',
        category: 'bugs',
        tags: ['JavaScript', 'Modules', 'JSON', 'CORS', 'V8'],
        status: 'broken',
        date: '2025-06-22',
        path: 'demos/json-module-errors/',
        code: `// Import JSON as a module (current syntax)
import data from './broken-data.json' with { type: 'json' };

// The broken JSON file (missing a comma):
{
  "properties": { "test": true, "count": 42 } "missingComma": true
}

// Even with CORS allowing it, the thrown error is reduced to a
// generic "Failed to fetch dynamically imported module" with no
// line/column or parse detail. That's the bug.`
    }
];

// Category → accent color + label
const CATEGORY = {
    rendering:   { color: '#6b63ff', label: 'rendering' },
    apis:        { color: '#177f8f', label: 'web-apis' },
    performance: { color: '#9a6a00', label: 'performance' },
    security:    { color: '#2f7d4f', label: 'security' },
    bugs:        { color: '#c23a1d', label: 'bug-repro' }
};

const STATUS_ICON = { stable: '✅', experimental: '🧪', broken: '🔴' };

// ============================================================
// State
// ============================================================
let currentFilter = 'all';
let searchQuery = '';
let isDarkMode = localStorage.getItem('theme')
    ? localStorage.getItem('theme') === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupEventListeners();
    updateStats();
    renderDemos();
    requestAnimationFrame(() => document.body.classList.remove('loading'));
});

function initializeTheme() {
    const toggle = document.getElementById('themeToggle');
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.innerHTML = '<span class="theme-icon">◑</span>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        toggle.innerHTML = '<span class="theme-icon">◐</span>';
    }
}

function setupEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.querySelectorAll('.filter-btn').forEach(btn =>
        btn.addEventListener('click', handleFilter));
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('demoModal').addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    initializeTheme();
}

function handleSearch(e) {
    searchQuery = e.target.value.toLowerCase();
    renderDemos();
}

function handleFilter(e) {
    currentFilter = e.target.dataset.category;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    renderDemos();
}

function updateStats() {
    const uniqueCategories = new Set(demoData.map(d => d.category));
    animateCounter('demoCount', demoData.length);
    animateCounter('categoryCount', uniqueCategories.size);
}

function animateCounter(elementId, target) {
    const el = document.getElementById(elementId);
    if (!el) return;
    let current = 0;
    const steps = 28;
    const increment = Math.max(target / steps, 1);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
    }, 28);
}

// ============================================================
// Rendering
// ============================================================
function renderDemos() {
    const catalog = document.getElementById('demosGrid');
    const filtered = demoData.filter(demo => {
        const matchesFilter = currentFilter === 'all' || demo.category === currentFilter;
        const haystack = (demo.title + ' ' + demo.description + ' ' + demo.tags.join(' ')).toLowerCase();
        const matchesSearch = searchQuery === '' || haystack.includes(searchQuery);
        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        catalog.innerHTML = `
            <div class="empty-state">
                <h3>No demos found</h3>
                <p>Try another filter or query in <code>filter demos…</code>.</p>
            </div>`;
        return;
    }

    catalog.innerHTML = filtered.map((demo, i) => createDemoRow(demo, i)).join('');
    document.querySelectorAll('.demo-row').forEach(row => {
        row.addEventListener('click', () => showDemoModal(row.dataset.demoId));
    });
}

function createDemoRow(demo, index) {
    const cat = CATEGORY[demo.category] || { color: '#6b7280', label: demo.category };
    const rowIndex = String(index + 1).padStart(2, '0');
    return `
        <button class="demo-row" data-demo-id="${demo.id}"
                style="--cat:${cat.color}; animation-delay:${index * 45}ms">
            <div class="row-index">${rowIndex}</div>
            <div class="row-main">
                <h3 class="row-title">${demo.title} <span class="arrow">↗</span></h3>
                <p class="row-desc">${demo.description}</p>
                <div class="row-tags">
                    ${demo.tags.map(t => `<span class="row-tag">${t}</span>`).join('')}
                </div>
            </div>
            <div class="row-meta">
                <span class="row-cat">${cat.label}</span>
                <span class="row-status">
                    <span class="status-sq status-${demo.status}"></span>
                    ${demo.status}
                </span>
                <span class="row-date">${formatDate(demo.date)}</span>
            </div>
        </button>`;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
}

// ============================================================
// Modal with live preview
// ============================================================
function showDemoModal(demoId) {
    const demo = demoData.find(d => d.id === demoId);
    if (!demo) return;

    const cat = CATEGORY[demo.category] || { color: '#6b7280', label: demo.category };
    document.getElementById('modalTitle').textContent = demo.title;

    const body = document.getElementById('modalBody');
    body.innerHTML = `
        <div class="modal-meta">
            <span class="row-cat" style="--cat:${cat.color}">${cat.label}</span>
            <span>${STATUS_ICON[demo.status] || ''} ${demo.status}</span>
            <span>· Updated ${formatDate(demo.date)}</span>
        </div>
        <p class="modal-lead">${demo.description}</p>

        <div class="modal-tags">
            ${demo.tags.map(t => `<span class="row-tag">${t}</span>`).join('')}
        </div>

        <div class="modal-section-title">Live preview</div>
        <div class="modal-preview">
            <div class="preview-bar">
                <span class="dots"><i></i><i></i><i></i></span>
                <span class="url">${demo.path}</span>
            </div>
            <iframe src="${demo.path}" title="${demo.title} preview" loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-modals"></iframe>
        </div>

        ${demo.code ? `
        <div class="modal-section-title">Code sample</div>
        <pre><code class="language-javascript">${escapeHtml(demo.code)}</code></pre>` : ''}

        <div class="modal-actions">
            <a class="btn btn-primary" href="${demo.path}" target="_blank" rel="noopener">
                Open full demo ↗
            </a>
            <a class="btn btn-secondary"
               href="https://github.com/issackjohn/demos/tree/main/${demo.path}"
               target="_blank" rel="noopener">
                View source
            </a>
        </div>`;

    document.getElementById('demoModal').classList.add('show');
    document.body.style.overflow = 'hidden';
    if (window.Prism) Prism.highlightAll();
}

function closeModal() {
    document.getElementById('demoModal').classList.remove('show');
    document.body.style.overflow = '';
    // stop any iframe playback / timers by clearing the body
    const body = document.getElementById('modalBody');
    if (body) body.innerHTML = '';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.body.classList.add('loading');
