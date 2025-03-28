# 🎮 life-game-cli

[![TypeScript](https://img.shields.io/badge/TypeScript-99%25-blue)](https://www.typescriptlang.org/)
[![GitHub stars](https://img.shields.io/github/stars/IlliaHalchun/life-game-cli?style=social)](https://github.com/IlliaHalchun/life-game-cli/stargazers)

> A beautiful terminal-based implementation of Conway's Game of Life, built with TypeScript.


<img src="https://github.com/IlliaHalchun/life-game-cli/blob/origin/demo.gif" alt="Life Game CLI Demo" width="600">


## ✨ Features

- 🖥️ Terminal-based user interface
- ⚡ High-performance simulation
- ⏯️ Play, pause, and step through generations

## 🧩 What is Conway's Game of Life?

Conway's Game of Life is a cellular automaton devised by mathematician John Conway in 1970. It's a zero-player game, meaning its evolution is determined by its initial state, with no further input from humans.
The game takes place on a grid of cells, each of which can be alive or dead. The state of each cell in the next generation is determined by these rules:

1. Any live cell with fewer than two live neighbors dies (underpopulation)
2. Any live cell with two or three live neighbors lives on
3. Any live cell with more than three live neighbors dies (overpopulation)
4. Any dead cell with exactly three live neighbors becomes alive (reproduction)

## 🚀 Installation

```bash
# Clone and build from source
git clone https://github.com/IlliaHalchun/life-game-cli.git
cd life-game-cli
npm install
npm run build
```

## ⌨️ Controls

| Key | Action |
|-----|--------|
| space | Play/Pause |
| l | Move cursor to the up |
| j | Move cursor to the down |
| h | Move cursor to the left |
| l | Move cursor to the right |
| o | Toggle cell |
| r | Set random cells state |
| c | Clear the state |
| p | Get one simulation step back |
| n | Get one simulation step forward |
| ctrl+c | Quit |

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- John Conway for creating the Game of Life
- The TypeScript team for an amazing language

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/IlliaHalchun">Illia Halchun</a>
</p>
