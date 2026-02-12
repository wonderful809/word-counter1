# TextTools - Professional Text Utilities

A complete, static, frontend-only collection of free text manipulation tools with a professional iLovePDF-inspired UI design and orange color palette. Perfect for writers, students, bloggers, social media managers, and developers.

## ✨ New Design Features

- **🎨 iLovePDF-Inspired UI**: Clean, modern design with professional look and feel
- **🌙 Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **📱 Mobile-First Responsive**: Hamburger menu, slide-in navigation, and optimized layouts
- **🎯 Smooth Animations**: Scroll reveal, hover effects, and smooth transitions
- **📊 Enhanced Tool Pages**: Colored header banners, breadcrumbs, FAQs, and "Try Another Tool" sections
- **⌨️ Keyboard Shortcuts**: Ctrl+Enter for actions, Ctrl+Shift+C for copying
- **🔝 Back to Top Button**: Appears after scrolling 300px with smooth scroll
- **🍞 Toast Notifications**: Clean, non-intrusive feedback messages
- **♿ Accessible**: Proper ARIA labels, semantic HTML, and keyboard navigation

## 🚀 Core Features

- **100% Client-Side**: All processing happens in your browser - no data is sent to any server
- **Real-Time Updates**: See results instantly as you type
- **Mobile Responsive**: Works seamlessly on all devices with dedicated mobile UI
- **No Sign-Up Required**: Start using tools immediately
- **Copy to Clipboard**: Easy one-click copying with visual feedback
- **SEO Optimized**: Each page has proper meta tags, structured data, and semantic HTML

## 🛠️ Tools Included

### 1. Word Counter
Count words, characters (with and without spaces), sentences, paragraphs, and estimate reading time. Perfect for essays, articles, and content with word limits.

**Features:**
- Real-time word counting
- Character count (with/without spaces)
- Sentence and paragraph counting
- Estimated reading time (based on 200 words/minute)

### 2. Character Counter
Track character counts with visual progress bars for Twitter (280 chars) and Instagram (2200 chars) limits.

**Features:**
- Total characters with and without spaces
- Twitter character limit indicator
- Instagram caption limit indicator
- Color-coded progress bars (green → yellow → red)

### 3. Case Converter
Transform text between different case styles instantly.

**Features:**
- UPPERCASE conversion
- lowercase conversion
- Title Case (First Letter Of Each Word)
- Sentence case (First letter of each sentence)
- tOGGLE cASE (flip case of every letter)
- Copy to clipboard functionality

### 4. Remove Line Breaks
Clean up text by removing unwanted line breaks from copied content.

**Features:**
- Replace line breaks with spaces
- Remove line breaks entirely
- Perfect for cleaning up PDF text
- Copy to clipboard functionality

### 5. Text Formatter
Advanced text formatting with multiple options that can be combined.

**Features:**
- Trim leading/trailing whitespace
- Remove extra spaces (collapse multiple spaces to one)
- Remove empty lines
- Add line numbers
- Sort lines alphabetically
- Combine multiple formatting options

## 📁 Project Structure

```
/
├── index.html                  # Homepage with tool grid
├── word-counter.html          # Word Counter tool
├── char-counter.html          # Character Counter tool
├── case-converter.html        # Case Converter tool
├── remove-line-breaks.html    # Remove Line Breaks tool
├── formatter.html             # Text Formatter tool
├── css/
│   └── style.css             # Complete CSS with iLovePDF-inspired design
├── js/
│   ├── shared.js             # Shared functionality (dark mode, mobile nav, toasts, etc.)
│   ├── word-counter.js       # Word Counter logic
│   ├── char-counter.js       # Character Counter logic
│   ├── case-converter.js     # Case Converter logic
│   ├── remove-line-breaks.js # Line Break Remover logic
│   └── formatter.js          # Text Formatter logic
└── README.md                  # This file
```

## 🎨 Design System

The site uses a clean, modern orange-accent theme inspired by iLovePDF:

- **Primary Orange**: `#FF7F00`
- **Primary Hover**: `#E06F00`
- **Primary Light**: `#FFF3E6`
- **Primary Gradient**: `linear-gradient(135deg, #FF7F00, #FF8C42)`
- **Text Dark**: `#333333` (Light mode) / `#E0E0E0` (Dark mode)
- **Text Medium**: `#666666` (Light mode) / `#B0B0B0` (Dark mode)
- **Background**: `#FFFFFF` (Light mode) / `#1A1A1A` (Dark mode)
- **Footer Background**: `#2D2D2D`

**Typography**: Inter font family from Google Fonts

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/wonderful809/word-counter1.git
   cd word-counter1
   ```

2. Open `index.html` in your web browser:
   - Double-click `index.html`, or
   - Right-click → Open with → Your preferred browser, or
   - Use a local server (optional):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server
     ```

3. Navigate to the tools using the navigation menu.

## 🌐 Deploy on GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select the branch (usually `main` or `master`)
4. Click **Save**
5. Your site will be published at: `https://[username].github.io/word-counter1/`

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)

## 🔒 Privacy

All tools work entirely in your browser. No data is sent to any server, and nothing is stored. Your privacy is completely protected.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License

Copyright (c) 2026 Text Tools & Word Counter Hub

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🌟 Acknowledgments

- Design Inspiration: [iLovePDF](https://www.ilovepdf.com/)
- Typography: [Inter Font](https://fonts.google.com/specimen/Inter) from Google Fonts
- Icons: Emoji icons from Unicode standard
- Architecture: Vanilla JavaScript, no frameworks or libraries

## 📧 Contact

For questions or feedback, please open an issue on [GitHub](https://github.com/wonderful809/word-counter1/issues).

---

Made with ❤️ for writers, students, and content creators everywhere.
