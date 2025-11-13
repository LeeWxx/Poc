# Tabs Demo

A minimal React + Vite dashboard that demonstrates how `useScrollSeam` preserves scroll context across two tabs and collapsible sections.

## Run it

```bash
# Build the root packages (the demo imports their dist output)
npm run build

cd examples/tabs-demo
npm install
npm run dev
```

Then open `http://localhost:5173` and try the following:

1. Scroll one tab until a section sits in the middle of the viewport.
2. Switch to the other tab and come back—the same anchor is restored.
3. Collapse and reopen sections to force layout shifts; the scroll position should still stay consistent.

> The demo disables `autoCapture` on `useScrollSeam` and calls `captureScroll` manually right before switching tabs. This guarantees the snapshot is recorded before the DOM hides the current tab.
