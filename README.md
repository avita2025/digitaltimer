# Digital Timer

A modern, responsive digital timer built with React and TypeScript featuring tick sound functionality.

## Features

- ⏰ **24-hour format display** (HH:MM:SS)
- 🎵 **Tick sound** that plays every second when running
- 🔊 **Sound toggle** in the top right corner
- ▶️ **Start/Stop/Reset** functionality
- 📱 **Responsive design** for all devices
- 🎨 **Modern UI** with smooth animations
- ⚡ **Immediate audio control** - stops instantly when buttons are clicked

## How to Use

1. **Start Timer**: Click the "Start" button to begin counting from 00:00:00
2. **Stop Timer**: Click "Stop" to pause the timer (keeps current time)
3. **Reset Timer**: Click "Reset" to stop and reset to 00:00:00
4. **Sound Control**: Click the 🔊 button in the top right to toggle sound on/off

## Audio Features

- Tick sound plays every second when timer is running
- Sound can be enabled/disabled with the toggle button
- Audio stops immediately when timer stops or resets
- Volume set to 50% for pleasant listening experience

## Technologies Used

- **React 18** with TypeScript
- **CSS3** with modern gradients and animations
- **HTML5 Audio API** for sound functionality
- **Create React App** for project setup

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/digital-timer.git
cd digital-timer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

## Project Structure

```
digital-timer/
├── public/
│   ├── timer.mp3          # Tick sound file
│   └── index.html
├── src/
│   ├── App.tsx           # Main timer component
│   ├── App.css           # Styling
│   └── index.tsx         # App entry point
└── README.md
```

## Customization

### Changing the Tick Sound

Replace the `public/timer.mp3` file with your own audio file. The app will automatically use the new sound.

### Modifying the Timer

The timer logic is in `src/App.tsx`. You can:
- Change the time format
- Modify the tick interval
- Adjust the volume level
- Customize the UI styling

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!

---

**Enjoy your digital timer!** ⏰✨
