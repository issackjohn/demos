// Demo data structure
const demoData = [
    {
        id: 'view-transitions',
        title: 'View Transitions API',
        description: 'Smooth page transitions using the View Transitions API for single-page applications.',
        category: 'apis',
        tags: ['JavaScript', 'Transitions', 'SPA', 'API'],
        status: 'experimental',
        date: '2025-06-15',
        path: 'demos/view-transitions/',
        code: `
// View Transitions API Demo
async function navigateWithTransition(newContent) {
    if (!document.startViewTransition) {
        // Fallback for browsers without support
        updateContent(newContent);
        return;
    }

    const transition = document.startViewTransition(() => {
        updateContent(newContent);
    });

    await transition.finished;
}

function updateContent(content) {
    document.getElementById('main-content').innerHTML = content;
}
        `.trim()
    },
    {
        id: 'container-queries',
        title: 'CSS Container Queries',
        description: 'Responsive design based on container size rather than viewport with @container rules.',
        category: 'rendering',
        tags: ['CSS', 'Responsive', 'Container', 'Layout'],
        status: 'stable',
        date: '2025-06-10',
        path: 'demos/container-queries/',
        code: `
/* Container Queries Demo */
.card-container {
    container-type: inline-size;
    container-name: card;
}

.card {
    padding: 1rem;
    background: white;
    border-radius: 8px;
}

@container card (min-width: 300px) {
    .card {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 1rem;
    }
}

@container card (min-width: 500px) {
    .card {
        padding: 2rem;
        font-size: 1.2em;
    }
}
        `.trim()
    },
    {
        id: 'web-locks',
        title: 'Web Locks API',
        description: 'Coordinate work across tabs and workers using the Web Locks API.',
        category: 'apis',
        tags: ['JavaScript', 'Concurrency', 'Tabs', 'Workers'],
        status: 'stable',
        date: '2025-06-08',
        path: 'demos/web-locks/',
        code: `
// Web Locks API Demo
async function performExclusiveTask() {
    await navigator.locks.request('my-resource', async (lock) => {
        console.log('Lock acquired, performing task...');
        
        // Simulate some work
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Task completed, releasing lock');
    });
}

// Check if another tab has the lock
navigator.locks.query().then(state => {
    console.log('Held locks:', state.held);
    console.log('Pending locks:', state.pending);
});
        `.trim()
    },    {
        id: 'json-module-errors',
        title: 'JSON Module Error Sanitization',
        description: 'Demo showing how JSON module import errors are sanitized with and without the crossorigin attribute.',
        category: 'bugs',
        tags: ['JavaScript', 'Modules', 'JSON', 'CORS', 'V8'],
        status: 'broken',
        date: '2025-06-18',
        path: 'demos/json-module-errors/',
        code: `
// JSON Module Import - WITHOUT crossorigin
import data from './broken-data.json' assert { type: 'json' };

// JSON Module Import - WITH crossorigin
<script type="module" crossorigin>
  import data from './broken-data.json' assert { type: 'json' };
</script>

// The broken JSON file (missing comma)
{
  "properties": {
    "test": true,
    "count": 42
  } "missingComma": true
}
        `.trim()
    },
    {
        id: 'origin-trial-bug',
        title: 'Origin Trial Registration Bug',
        description: 'Reproduction of a bug where origin trial tokens are not properly validated.',
        category: 'bugs',
        tags: ['Origin Trials', 'Security', 'Headers', 'Bug Report'],
        status: 'broken',
        date: '2025-06-05',
        path: 'bugs/origin-trial-validation/',
        code: `
// Origin Trial Bug Reproduction
// Issue: Invalid tokens are being accepted

// Test with malformed token
const malformedToken = 'invalid-base64-token-here';
document.head.appendChild(
    Object.assign(document.createElement('meta'), {
        httpEquiv: 'origin-trial',
        content: malformedToken
    })
);

// Expected: Feature should not be enabled
// Actual: Feature is incorrectly enabled
if ('newExperimentalAPI' in window) {
    console.error('Bug confirmed: Invalid token accepted');
}
        `.trim()
    },
    {
        id: 'paint-worklet',
        title: 'CSS Paint Worklet',
        description: 'Custom CSS painting using Houdini Paint API for unique visual effects.',
        category: 'rendering',
        tags: ['Houdini', 'Paint API', 'CSS', 'Canvas'],
        status: 'experimental',
        date: '2025-06-01',
        path: 'demos/paint-worklet/',
        code: `
// Paint Worklet Demo
// Register the worklet
CSS.paintWorklet.addModule('ripple-painter.js');

/* CSS */
.ripple-background {
    background: paint(ripple);
    --ripple-color: #3b82f6;
    --ripple-size: 50;
    --ripple-opacity: 0.8;
}

// ripple-painter.js
class RipplePainter {
    static get inputProperties() {
        return ['--ripple-color', '--ripple-size', '--ripple-opacity'];
    }

    paint(ctx, size, properties) {
        const color = properties.get('--ripple-color').toString();
        const rippleSize = parseInt(properties.get('--ripple-size'));
        const opacity = parseFloat(properties.get('--ripple-opacity'));
        
        // Paint ripple effect
        // ... painting logic
    }
}

registerPaint('ripple', RipplePainter);
        `.trim()
    }
];

// Application state
let currentFilter = 'all';
let searchQuery = '';
let isDarkMode = localStorage.getItem('theme') === 'dark';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupEventListeners();
    updateStats();
    renderDemos();
    
    // Add some loading animation
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);
});

function initializeTheme() {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeToggle').innerHTML = '<span class="theme-icon">☀️</span>';
    }
}

function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Modal
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('demoModal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const themeToggle = document.getElementById('themeToggle');
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<span class="theme-icon">☀️</span>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<span class="theme-icon">🌙</span>';
        localStorage.setItem('theme', 'light');
    }
}

function handleSearch(e) {
    searchQuery = e.target.value.toLowerCase();
    renderDemos();
}

function handleFilter(e) {
    const category = e.target.dataset.category;
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    renderDemos();
}

function updateStats() {
    const uniqueCategories = [...new Set(demoData.map(demo => demo.category))];
    document.getElementById('demoCount').textContent = demoData.length;
    document.getElementById('categoryCount').textContent = uniqueCategories.length;
    
    // Animate numbers
    animateCounter('demoCount', demoData.length);
    animateCounter('categoryCount', uniqueCategories.length);
}

function animateCounter(elementId, target) {
    const element = document.getElementById(elementId);
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 50);
}

function renderDemos() {
    const grid = document.getElementById('demosGrid');
    const filteredDemos = demoData.filter(demo => {
        const matchesFilter = currentFilter === 'all' || demo.category === currentFilter;
        const matchesSearch = searchQuery === '' || 
            demo.title.toLowerCase().includes(searchQuery) ||
            demo.description.toLowerCase().includes(searchQuery) ||
            demo.tags.some(tag => tag.toLowerCase().includes(searchQuery));
        
        return matchesFilter && matchesSearch;
    });
    
    if (filteredDemos.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
                <h3>No demos found</h3>
                <p style="color: var(--text-secondary);">Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredDemos.map(demo => createDemoCard(demo)).join('');
    
    // Add click listeners to demo cards
    document.querySelectorAll('.demo-card').forEach(card => {
        card.addEventListener('click', () => {
            const demoId = card.dataset.demoId;
            showDemoModal(demoId);
        });
    });
}

function createDemoCard(demo) {
    const categoryColors = {
        'rendering': '#8b5cf6',
        'apis': '#06b6d4',
        'performance': '#f59e0b',
        'security': '#ef4444',
        'bugs': '#6b7280'
    };
    
    const statusIcons = {
        'stable': '✅',
        'experimental': '🧪',
        'broken': '🔴'
    };
    
    return `
        <div class="demo-card" data-demo-id="${demo.id}">
            <div class="demo-header">
                <div>
                    <h3 class="demo-title">${demo.title}</h3>
                </div>
                <div class="demo-category" style="background: ${categoryColors[demo.category] || '#6b7280'}">
                    ${demo.category}
                </div>
            </div>
            <p class="demo-description">${demo.description}</p>
            <div class="demo-tags">
                ${demo.tags.map(tag => `<span class="demo-tag">${tag}</span>`).join('')}
            </div>
            <div class="demo-footer">
                <div class="demo-status">
                    <span class="status-dot status-${demo.status}"></span>
                    <span>${statusIcons[demo.status]} ${demo.status}</span>
                </div>
                <div class="demo-date">${formatDate(demo.date)}</div>
            </div>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function showDemoModal(demoId) {
    const demo = demoData.find(d => d.id === demoId);
    if (!demo) return;
    
    const modal = document.getElementById('demoModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    title.textContent = demo.title;
    
    const statusColors = {
        'stable': 'var(--success)',
        'experimental': 'var(--warning)',
        'broken': 'var(--error)'
    };
    
    body.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                <span class="demo-category" style="background: ${getStatusColor(demo.status)};">
                    ${demo.status}
                </span>
                <span style="color: var(--text-muted);">
                    Category: ${demo.category}
                </span>
                <span style="color: var(--text-muted);">
                    Updated: ${formatDate(demo.date)}
                </span>
            </div>
            <p style="font-size: 1.1rem; line-height: 1.6; color: var(--text-secondary);">
                ${demo.description}
            </p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Tags</h4>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                ${demo.tags.map(tag => `<span class="demo-tag">${tag}</span>`).join('')}
            </div>
        </div>
        
        ${demo.code ? `
        <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Code Sample</h4>
            <pre><code class="language-javascript">${escapeHtml(demo.code)}</code></pre>
        </div>
        ` : ''}
        
        <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Demo Preview</h4>
            <div class="demo-preview">
                <div style="display: flex; align-items: center; justify-content: center; height: 200px; color: var(--text-muted);">
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🚧</div>
                        <p>Interactive demo will be available at:</p>
                        <code style="background: var(--bg-secondary); padding: 0.5rem; border-radius: 0.25rem;">
                            ${demo.path}
                        </code>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button onclick="window.open('${demo.path}', '_blank')" 
                    style="padding: 0.75rem 1.5rem; background: var(--accent); color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 500;">
                View Demo
            </button>
            <button onclick="window.open('https://github.com/issackjohn/demos/tree/main/${demo.path}', '_blank')"
                    style="padding: 0.75rem 1.5rem; background: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border); border-radius: 0.5rem; cursor: pointer; font-weight: 500;">
                View Source
            </button>
        </div>
    `;
    
    modal.classList.add('show');
    
    // Highlight code if Prism is available
    if (window.Prism) {
        Prism.highlightAll();
    }
}

function getStatusColor(status) {
    const colors = {
        'stable': 'var(--success)',
        'experimental': 'var(--warning)',
        'broken': 'var(--error)'
    };
    return colors[status] || 'var(--text-muted)';
}

function closeModal() {
    document.getElementById('demoModal').classList.remove('show');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add some interactive features
document.addEventListener('mousemove', function(e) {
    // Subtle parallax effect for floating elements
    const elements = document.querySelectorAll('.element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    elements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Smooth scroll behavior for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add loading state to body initially
document.body.classList.add('loading');
