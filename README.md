# 🧪 Chromium Demos & Reproductions

A curated collection of interactive demonstrations, bug reproductions, and experimental features for Chromium development and web platform testing.

🌐 **Live Site**: [https://issackjohn.github.io/demos](https://issackjohn.github.io/demos)

## ✨ Features

- **Interactive Demos**: Hands-on examples of cutting-edge web technologies
- **Bug Reproductions**: Minimal test cases for reported issues
- **Experimental APIs**: Early access features and origin trials
- **Responsive Design**: Works beautifully on all devices
- **Dark/Light Themes**: Toggle between themes for comfortable viewing
- **Live Code Preview**: See the code behind each demonstration
- **Search & Filter**: Easily find demos by category or technology

## 🚀 Quick Start

1. **Browse Online**: Visit [issackjohn.github.io/demos](https://issackjohn.github.io/demos)
2. **Run Locally**: 
   ```bash
   git clone https://github.com/issackjohn/demos.git
   cd demos
   # Open index.html in your browser or serve with a local server
   python -m http.server 8000  # Python 3
   # or
   npx http-server
   ```

## 📁 Project Structure

```
demos/
├── index.html              # Main landing page
├── styles.css              # Global styles and themes
├── script.js               # Interactive functionality
├── demos/                  # Individual demo directories
│   ├── css-scroll-timeline/
│   │   └── index.html
│   ├── view-transitions/
│   │   └── index.html
│   └── container-queries/
│       └── index.html
├── bugs/                   # Bug reproduction cases
│   └── origin-trial-validation/
└── README.md
```

## 🎯 Demo Categories

### 🎨 Rendering
- **Container Queries**: Responsive design based on container size
- **CSS Paint Worklet**: Custom painting with Houdini APIs
- **CSS View Transitions**: Smooth page transitions

### 🔧 Web APIs
- **View Transitions API**: Smooth SPA navigation
- **Web Locks API**: Cross-tab coordination
- **Origin Trials**: Experimental feature testing
- **Progressive Enhancement**: Graceful fallbacks

### ⚡ Performance
- **Loading Optimizations**: Resource hints and preloading
- **Animation Performance**: GPU-accelerated effects
- **Bundle Analysis**: Code splitting demonstrations

### 🔒 Security
- **Content Security Policy**: CSP implementation examples
- **Cross-Origin Isolation**: COEP/COOP configurations
- **Secure Contexts**: HTTPS-only features

### 🐛 Bug Reproductions
- **JSON Module Error Sanitization**: Error handling issues with imported JSON modules
- **Origin Trial Issues**: Token validation problems
- **Rendering Bugs**: Layout and painting issues
- **API Inconsistencies**: Behavior differences across browsers

## 🛠️ Adding New Demos

### 1. Create Demo Directory
```bash
mkdir demos/your-demo-name
cd demos/your-demo-name
```

### 2. Create Demo Files
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Demo Title</title>
    <!-- Add your styles -->
</head>
<body>
    <a href="../../index.html" class="back-link">← Back to Demos</a>
    
    <!-- Your demo content -->
    
    <script>
        // Your demo JavaScript
    </script>
</body>
</html>
```

### 3. Update Demo Registry
Add your demo to the `demoData` array in `script.js`:

```javascript
{
    id: 'your-demo-id',
    title: 'Your Demo Title',
    description: 'Brief description of what your demo demonstrates',
    category: 'rendering', // or 'apis', 'performance', 'security', 'bugs'
    tags: ['CSS', 'JavaScript', 'YourTechnology'],
    status: 'experimental', // or 'stable', 'broken'
    date: '2025-06-18',
    path: 'demos/your-demo-name/',
    code: `
        // Optional: Sample code to display in modal
        const example = 'Your code here';
    `.trim()
}
```

## 🎨 Design Guidelines

### Visual Design
- Use CSS custom properties for theming
- Implement smooth transitions and animations
- Ensure accessibility with proper contrast ratios
- Follow responsive design principles

### Code Structure
- Keep demos self-contained in their directories
- Include fallbacks for unsupported features
- Add clear comments explaining the technology
- Provide links back to the main site

### Browser Support
- Test in latest Chrome/Chromium builds
- Include feature detection and graceful degradation
- Document browser support requirements
- Use progressive enhancement patterns

## 🔧 Development Tools

### Recommended Extensions
- **Live Server**: For local development
- **Chrome DevTools**: For debugging and profiling
- **Lighthouse**: For performance auditing

### Useful Flags
Enable experimental features in Chrome:
```
chrome://flags/#enable-experimental-web-platform-features
chrome://flags/#enable-experimental-canvas-features
chrome://flags/#enable-experimental-productivity-features
```

## 📊 Analytics & Monitoring

The site includes basic analytics to track:
- Demo popularity and usage patterns
- Browser support statistics
- Performance metrics
- User feedback and bug reports

## 🤝 Contributing

### Bug Reports
1. Check existing issues first
2. Provide minimal reproduction steps
3. Include browser version and flags
4. Add screenshots or screen recordings

### Feature Requests
1. Describe the use case clearly
2. Link to relevant specifications
3. Consider browser support implications
4. Suggest implementation approach

### Code Contributions
1. Fork the repository
2. Create a feature branch
3. Follow existing code style
4. Test across browsers
5. Submit a pull request

## 📚 Resources

### Specifications
- [CSS Animations Level 2](https://drafts.csswg.org/css-animations-2/)
- [View Transitions](https://drafts.csswg.org/css-view-transitions/)
- [CSS Container Queries](https://drafts.csswg.org/css-contain-3/)
- [Web Locks API](https://w3c.github.io/web-locks/)

### Tools & References
- [Chromium Source](https://chromium.googlesource.com/chromium/src/)
- [Chrome Platform Status](https://chromestatus.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)

---

**Made with ❤️ for the Chromium community**

For questions or suggestions, feel free to [open an issue](https://github.com/issackjohn/demos/issues) or reach out on GitHub.
