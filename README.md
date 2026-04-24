# Sticky Notes Drag and Drop

A high-performance Sticky Notes application built with React, TypeScript, and Zustand.

## 🚀 Live Demo

[https://isma907.github.io/React-Notes-Drag-and-Drop/](https://isma907.github.io/React-Notes-Drag-and-Drop/)

## 📝 How to use

- **Create Notes**: Double-click anywhere on the empty board to generate a new sticky note.
- **Edit Content**: Click on any note to edit its text content. Changes are saved automatically.
- **Drag & Drop**: Move notes around the board by dragging them from the top handler.
- **Resize**: Adjust the size of your notes by dragging the bottom-right corner.
- **Stacking Order**: Interacting with a note (drag/resize) automatically brings it to the front.
- **Delete**: Drag a sticky note into the trash can icon at the top to delete it.
- **Persistence**: Your notes are saved locally in your browser, so they persist across sessions.

## ⚡ Performance Optimizations

- **Zustand Selectors**: Components only subscribe to the specific data they need.
- **Memoization**: Key components like `StickyNote` are wrapped in `React.memo`.
- **Z-Index Management**: Stacking order is handled individually via the store to avoid re-rendering the entire board.
- **DOM Manipulation**: Drag and resize operations use direct DOM manipulation for maximum smoothness, only syncing with React state when the interaction ends.

## 📦 Installation & Build

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run development server**:
   ```bash
   npm run dev
   ```
3. **Run tests**:
   ```bash
   npm run test
   ```
