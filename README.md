# scroll-seam

Scroll Seam is a package monorepo that currently ships two sub packages.

| Package | Description |
| --- | --- |
| `@scroll-context/core` | Runtime primitives that capture/restore anchor-based scroll snapshots using `sessionStorage`. |
| `@scroll-context/react` | React adapter that exposes the core runtime through the `useScrollSeam` hook. |

> Neither package is published yet, so install them via workspace/local paths while iterating.

## Development

```bash
npm install

# Build each package
npm run build:core
npm run build:react

# Build everything
npm run build

# Lint
npm run lint
```

### Package layout

- `packages/core`: TypeScript runtime exports `captureScroll` and `restoreScroll`.
- `packages/react`: React-only hook `useScrollSeam` that depends on the core runtime.

Each package owns its `tsconfig.json` and extends the root config. Build artifacts land in `dist/` and are ignored by Git.

## Example project

`examples/tabs-demo` is a React demo with two tabs and collapsible sections. It uses `useScrollSeam` to capture and restore scroll context while switching tabs or folding content.

```bash
# Build the root packages (the demo consumes their dist output)
npm run build

cd examples/tabs-demo
npm install
npm run dev
```

Open `http://localhost:5173`, scroll into a section, switch tabs, collapse/expand cards, and observe that scroll restoration keeps returning to the same anchor.  
The demo showcases both automatic `useScrollSeam` usage and a manual `captureScroll` call right before tabs are hidden (using the new `autoCapture` flag) so you can see how to handle disruptive layout changes.

## Release checklist

1. Run `npm run build` to compile both packages.
2. Align versions inside `packages/*/package.json` as needed.
3. Publish manually to your registry of choice or wire up another release tool.
