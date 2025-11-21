# Aboard

<div align="center">

**[简体中文](README.md)** | **[繁體中文](README.zh-TW.md)** | **[English](README.en.md)**

</div>

> A minimalist and elegant web-based whiteboard application, designed for teaching and presentations | 𝓙𝓾𝓼𝓽 𝓪 𝓫𝓸𝓪𝓻𝓭.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Key Features

### 🎨 Diverse Drawing Tools
- **Multiple Pen Types**: Normal pen, pencil, ballpoint, fountain pen, brush - catering to different writing needs
- **Smart Eraser**: Supports circular and square shapes, adjustable size (10-50px)
- **Rich Color Selection**: 8 preset common colors + custom color picker
- **Flexible Stroke Width**: Adjustable pen thickness from 1-50px

### 📐 Professional Background Patterns
- **Multiple Teaching Backgrounds**: Blank, dots, grid, Tianzige (Chinese grid), English 4-line, staff, coordinate system
- **Custom Background**: Support uploading images as backgrounds with adjustable size and position
- **Background Styles**: 8 preset background colors + custom colors, adjustable transparency and pattern intensity

### 📄 Flexible Canvas Modes
- **Infinite Canvas Mode**: Draw freely without restrictions
- **Pagination Mode**: Multi-page management, perfect for classroom presentations
  - Preset sizes: A4, A3, B5 (landscape/portrait), 16:9, 4:3 widescreen
  - Custom sizes: Freely set canvas width, height, and aspect ratio

### 🎯 Smart Interactive Experience
- **Selection Tool**: Select and manipulate strokes and images on canvas, supports copy and delete
- **Move Canvas**: Drag tool or hold Shift key to drag canvas
- **Smart Zoom**: Ctrl+scroll to zoom canvas, zoom center follows mouse position
- **Undo/Redo**: Supports up to 50 history steps (Ctrl+Z / Ctrl+Y)
- **Fullscreen Mode**: Focus on creation with immersive experience (F11)

### ⏱️ Timer Function
- **Stopwatch Mode**: Set start time and count up from specified time
- **Countdown Mode**: Precise countdown, perfect for exams, speeches, etc.
- **Color Customization**:
  - Text color selection: 8 preset colors + custom color picker
  - Background color selection: 8 preset colors + custom color picker
  - Color settings apply to timer display and fullscreen mode
- **Sound Alert System**:
  - Preloads 4 built-in alert sounds on page load for instant playback
  - 4 default alert sounds arranged in 2x2 grid for intuitive selection
  - Supports uploading multiple custom audio files
  - Custom audio automatically saved locally, persists after refresh
  - Custom audio supports preview function
- **Loop Playback**: Set loop count (1-100 times)
- **Drag and Fullscreen**:
  - Supports mouse and touch dragging for smooth, lag-free movement

### 🕒 Time Display
- **Real-time Clock**: Display current time with date
- **Multiple Timezones**: Support 15 common timezones
- **Format Options**:
  - Time format: 12-hour (AM/PM) / 24-hour
  - Date format: 4 different formats including Chinese
- **Customizable Appearance**:
  - Text and background color selection
  - Font size adjustment (12-48px)
  - Opacity control (10-100%)
- **Fullscreen Mode**: Single/double-click to enter fullscreen
- **Drag & Drop**: Movable position, convenient placement

### 💾 Export & Save
- **PNG Export**: Export canvas as high-quality PNG image
- **Auto-save**: Automatically save drawings to browser local storage
- **Clear Canvas**: One-click to clear all content (with confirmation)

### 🌍 Multi-language Support
- **Supported Languages**: Chinese (Simplified), Chinese (Traditional), English, Japanese, Korean, French, German, Spanish
- **Auto-detection**: Automatically detects browser language on first visit
- **Easy Switching**: Change language anytime in Settings > General
- **Instant Apply**: Language changes take effect immediately after page reload
- **Persistent**: Language preference is saved locally

### 📱 Full Touch Support
- **Touch Drawing**: Optimized for tablets and touch screens
- **Gesture Support**: Touch drag, pinch to zoom
- **Responsive Design**: Adapts to various screen sizes

## 🚀 Quick Start

### Online Demo
Visit our [GitHub Pages](https://lifeafter619.github.io/Aboard/) to try it immediately!

### Local Deployment
1. Clone the repository:
```bash
git clone https://github.com/lifeafter619/Aboard.git
```

2. Open `index.html` in your browser

That's it! No build process or dependencies required.

## 💡 Usage Tips

### Basic Operations
- **Select Tool**: Click corresponding icon in bottom toolbar
- **Draw**: Click and drag on canvas
- **Erase**: Use eraser tool, adjust size as needed
- **Zoom**: Use zoom buttons or Ctrl+scroll wheel
- **Undo/Redo**: Ctrl+Z / Ctrl+Y or click toolbar buttons
- **Fullscreen**: Press F11 or click fullscreen button

### Advanced Features
- **Background Pattern**: Click "Background" button, choose pattern and color
- **Timer**: Click "Features" > "Timer", set mode and duration
- **Time Display**: Click "Features" > "Time", configure display options
- **Settings**: Click "Settings" button to access detailed configurations

## 🛠️ Technology Stack

- **Frontend**: Pure JavaScript (no framework dependencies)
- **Drawing**: HTML5 Canvas API
- **Storage**: localStorage for data persistence
- **Performance**: RequestAnimationFrame for smooth animations
- **Compatibility**: Supports modern browsers (Chrome, Firefox, Safari, Edge)

## 📋 Browser Compatibility

| Browser | Minimum Version |
|---------|----------------|
| Chrome  | 80+           |
| Firefox | 75+           |
| Safari  | 13+           |
| Edge    | 80+           |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit Pull Requests.

### Development Guidelines
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Thanks to all contributors who helped make this project better!

## 📧 Contact

If you have any questions or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for educators and presenters**
