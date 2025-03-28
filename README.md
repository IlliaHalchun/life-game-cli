# 🎮 life-game-cli

[![TypeScript](https://img.shields.io/badge/TypeScript-99%25-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/github/license/IlliaHalchun/life-game-cli)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/IlliaHalchun/life-game-cli?style=social)](https://github.com/IlliaHalchun/life-game-cli/stargazers)

> A beautiful terminal-based implementation of Conway's Game of Life, built with TypeScript.

<p align="center">
  <img src="https://raw.githubusercontent.com/IlliaHalchun/life-game-cli/main/assets/demo.gif" alt="Life Game CLI Demo" width="600">
</p>

## ✨ Features

- 🖥️ Terminal-based user interface
- ⚡ High-performance simulation
- 🎨 Customizable cell colors and board size
- 🔄 Multiple initial patterns to choose from
- ⏯️ Play, pause, and step through generations
- 💾 Save and load game states

## 🧩 What is Conway's Game of Life?

Conway's Game of Life is a cellular automaton devised by mathematician John Conway in 1970. It's a zero-player game, meaning its evolution is determined by its initial state, with no further input from humans.

The game takes place on a grid of cells, each of which can be alive or dead. The state of each cell in the next generation is determined by these rules:

1. Any live cell with fewer than two live neighbors dies (underpopulation)
2. Any live cell with two or three live neighbors lives on
3. Any live cell with more than three live neighbors dies (overpopulation)
4. Any dead cell with exactly three live neighbors becomes alive (reproduction)

## 🚀 Installation

```bash
# Using npm
npm install -g life-game-cli

# Using yarn
yarn global add life-game-cli

# Or clone and build from source
git clone https://github.com/IlliaHalchun/life-game-cli.git
cd life-game-cli
npm install
npm run build
```

## 🎮 Usage

```bash
# Start the game with default settings
life-game

# Specify board size
life-game --width 80 --height 40

# Start with a specific pattern
life-game --pattern glider

# List all available patterns
life-game --list-patterns

# Custom colors
life-game --alive-color green --dead-color black
```

## ⌨️ Controls

| Key | Action |
|-----|--------|
| Space | Play/Pause |
| Right Arrow | Step forward one generation |
| R | Reset to initial state |
| S | Save current state |
| L | Load saved state |
| C | Clear the board |
| 1-9 | Load preset pattern |
| Q / Ctrl+C | Quit |

## ⚙️ Configuration

You can create a `.lifegamerc` configuration file in your home directory to customize your experience:

```json
{
  "defaultWidth": 100,
  "defaultHeight": 40,
  "defaultPattern": "random",
  "aliveColor": "green",
  "deadColor": "black",
  "tickRate": 200
}
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/IlliaHalchun/life-game-cli.git

# Navigate to the project directory
cd life-game-cli

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- John Conway for creating the Game of Life
- The TypeScript team for an amazing language
- All the contributors who have helped shape this project

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/IlliaHalchun">Illia Halchun</a>
</p>
