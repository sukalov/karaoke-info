# AGENTS.md

Guidelines for agentic coding agents working on this Astro-based karaoke landing page.

## Project Overview

Landing page for "Живое караоке" (Live Karaoke) featuring an interactive piano synthesizer. Built with Astro, TypeScript, Tailwind CSS, and Howler.js for audio.

### Design Philosophy

- **Video Background**: Full-screen autoplay video with loading screen
- **Floating Blocks**: Semi-transparent content sections with parallax scrolling on desktop
- **Mobile-First**: Stacked layout on mobile, floating effect on desktop (`md:` breakpoint)

## Development Commands

### Core Commands

- `npm run dev` / `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier (runs `prettier --write **/*.astro .`)
- `npm run clean` - Clean dist, .astro, and node_modules

### Testing

No test framework configured. If adding tests, use `npm test` and `npm test -- <pattern>` for single tests.

## Code Style Guidelines

### File Structure

- **Pages**: `src/pages/` - Astro routes
- **Components**: `src/components/` - Reusable Astro components
- **Styles**: `src/styles/` - Global CSS files
- **Types**: `src/types.ts` - TypeScript definitions (currently empty)
- **Assets**: `public/` - Static assets

### Import Conventions

```typescript
// External imports first, then internal
import { Howl } from "howler";
import { sounds } from "./sounds.ts";

// Use ~ alias for src imports
import Component from "~/components/component.astro";
import "~/styles/global.css";
```

### TypeScript/JavaScript

- Use TypeScript for all logic
- Define types in `src/types.ts` for complex structures
- Use proper typing for parameters and return values
- Use `const` by default, `let` only when needed
- Use `NodeJS.Timeout` for setTimeout return values
- Use browser-native DOM types (`SVGGElement`, `SVGElement`)

### Astro Component Pattern

```astro
---
// Frontmatter with imports first
import Component from "./component.astro";
import "~/styles/component.css";

// Props and logic
const { prop1, prop2 } = Astro.props;
---

<!-- Template with semantic HTML -->
<div class="component">
  <Component />
</div>

<style lang="scss">
  // Component-specific styles
</style>
```

### CSS/SCSS Styling

- Use Tailwind classes for rapid styling
- Use `lang="scss"` blocks for complex component styles
- Follow mobile-first responsive design
- Use CSS variables from theme system (`bg-default`, `text-default`)

### Floating Blocks Pattern

```astro
<div class="overflow-visible pt-8 md:h-0 md:p-0 md:pl-4">
  <section
    class="fast-div mx-2 rounded-[3rem] bg-default p-8 opacity-85 md:absolute md:mr-auto md:w-[22rem]"
  >
    <!-- Content -->
  </section>
</div>
```

Parallax JavaScript:

```javascript
const isMobile = () => window.innerWidth < 768;

if (!isMobile()) {
  const element = document.querySelector(".element-class") as HTMLElement;
  if (element) {
    let raf: number | null = null;
    const speedMultiplier = 2.65; // Unique per block
    const initY = 0;
    let lastScrollY = window.scrollY;

    const updatePosition = () => {
      element.style.transform = `translateY(${initY - window.scrollY * speedMultiplier}px)`;
      raf = null;
    };

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) >= 2) {
        lastScrollY = currentScrollY;
        if (!raf) {
          raf = requestAnimationFrame(updatePosition);
        }
      }
    }, { passive: true });
  }
}
```

**Speed Multipliers**:

- Title Block: Variable (2.65x, then 2x with wait time)
- Main Text: 2.65x
- Tech Rider: 1.3x
- Contact/Synth: No floating (static)

### Naming Conventions

- **Files**: kebab-case (e.g., `synth-keyboard.astro`)
- **Components**: PascalCase (e.g., `SynthKeyboard`)
- **Functions**: camelCase (e.g., `pressKey`, `handleMouseDown`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `SOUNDS_DIRECTORY`)
- **CSS Classes**: kebab-case with Tailwind utilities
- **Types**: PascalCase (e.g., `NoteName`, `WhiteKey`)

### Error Handling

- Use `tiny-invariant` for runtime assertions
- Check for null/undefined DOM elements before operations
- Handle browser API differences gracefully
- Use optional chaining for safe property access

### Audio/Synth Guidelines

- Use Howler.js for audio playback
- Define sound sprite mappings with precise timing
- Support both touch and mouse events
- Handle keyboard events for accessibility
- Prevent default behaviors for audio interactions
- Clean up audio resources on unmount

## Configuration

- **Astro**: Simple setup with Tailwind and astro-icon integrations
- **Tailwind**: Extended theme with custom colors, Inter Variable font, fluid-type plugin
- **TypeScript**: Strict mode with `~/*` path mapping to `src/*`
- **Prettier**: astro and tailwindcss plugins

## Development Workflow

1. Read existing files to understand patterns
2. Follow established file structure and naming
3. Use the same libraries and patterns as existing code
4. Format code before committing: `npm run format`
5. Test changes in development: `npm run dev`

### Common Mistakes to Avoid

**Responsive Design - Mobile-First Breakpoints:**
Always check if a style should be mobile-only or desktop-only. The project uses mobile-first approach with `md:` breakpoint for desktop styles.

When fixing layout gaps between sections:

- On **mobile**: Sections stack vertically with normal spacing (no negative margins)
- On **desktop**: Floating blocks use negative margins to create overlap effects
- Always verify if the original style had a breakpoint prefix before modifying it

### Component Development

- Keep components focused and single-purpose
- Use props for configuration
- Separate client-side scripts in `<script>` blocks
- Use semantic HTML5 elements
- Implement proper event handling with cleanup

### Performance

- Use Astro islands for client-side interactivity
- Lazy load audio assets
- Optimize images and assets
- Use CSS transitions over JS animations
- Implement `requestAnimationFrame` throttling
- Use `{ passive: true }` for scroll listeners

## Tool Integration

- **Astro 5.17.1** with strict TypeScript
- **Tailwind CSS 4.1.18** with custom theme
- **Howler.js 2.2.4** for audio
- **Prettier** with astro and tailwind plugins
- **SCSS** via sass-embedded

Always check package.json for latest versions and scripts.
