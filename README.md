# 🧪 Chromium Development Demos

A collection of interactive demos, bug reproductions, and experimental features for Chromium development and web platform testing.

🌐 **Live Site**: [https://issackjohn.github.io/demos](https://issackjohn.github.io/demos)

## ✨ Current Demos

### JSON Module Error Sanitization
Demonstrates how JSON module import errors are sanitized with and without the `crossorigin` attribute, showing a bug where detailed error information is hidden even when CORS would allow it.

**Test Cases**: 
- **Without `crossorigin`**: Shows generic errors (expected behavior)
- **With `crossorigin`**: Should show detailed parse errors but doesn't (bug)
- Uses intentionally invalid JSON to trigger parsing errors
- Based on Web Platform Test (WPT) patterns

## 🚀 Quick Start

1. **Browse Online**: Visit [issackjohn.github.io/demos](https://issackjohn.github.io/demos)
2. **Run Locally**: 
   ```bash
   git clone https://github.com/issackjohn/demos.git
   cd demos
   python -m http.server 8000  # Python 3
   # or use any static server
   ```
3. **Explore**: Navigate through the available demos and experiments

## 📁 Project Structure

```
demos/
├── index.html              # Main landing page
├── styles.css              # Global styles and themes  
├── script.js               # Interactive functionality
├── demos/                  # Individual demo directories
│   └── json-module-errors/
│       ├── index.html      # Demo explanation page
│       ├── broken-data.json # Intentionally invalid JSON
│       ├── with-cors/      # Test with crossorigin attribute
│       │   └── index.html
│       └── no-cors/        # Test without crossorigin attribute
│           └── index.html
└── README.md
```

## �️ Adding New Demos

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
    date: '2025-06-19',
    path: 'demos/your-demo-name/',
    code: `
        // Optional: Sample code to display in modal
        const example = 'Your code here';
    `.trim()
}
```

## 🎨 Design Guidelines

- Keep demos self-contained in their directories
- Include clear documentation and examples
- Use modern web standards and best practices
- Test in latest Chrome/Chromium builds
- Provide fallbacks for unsupported features

## 🤝 Contributing

### Adding Demos
Feel free to contribute new demos, bug reproductions, or experimental features! Follow the structure above and submit a pull request.

### Bug Reports
Found an issue? Please [open an issue](https://github.com/issackjohn/demos/issues) with reproduction steps and browser information.

---

**Made for the Chromium development community** - exploring web platform features and behaviors.
