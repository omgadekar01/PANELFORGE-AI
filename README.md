# PanelForge AI

**Where Stories Become Worlds.**

PanelForge AI is a frontend MVP for turning scripts into editable storyboard panels, character references, comic layouts, dialogue bubbles, and exports. It uses CSS artwork placeholders and local browser storage; no AI service or backend is required.

## Run locally

```bash
npm install
npm run dev
```

## Workflow

- Dashboard and built-in **The Last Signal** demo
- Create a project and generate a sample story structure
- Edit, regenerate, and lock character references
- Edit, reorder, regenerate, and delete panels
- Arrange panels in comic layouts and edit panel dialogue
- Export a PNG or PDF, or preview a simple browser animatic

Projects are saved in `localStorage` under `panelforge_projects`.

## Stack

React, TypeScript, Vite, Tailwind CSS, React Router, Lucide React, and jsPDF.

## Notes

Story analysis and panel/character variations are local demo behavior, not AI generation. PNG and PDF exports are composed in the browser. The animatic is a browser preview rather than a video file.
