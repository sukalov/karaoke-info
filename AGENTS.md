# AGENTS.md

This file provides essential information for agentic coding agents working on this karaoke landing page project.

## Project Overview

This is an Astro-based landing page for "Живое караоке" (Live Karaoke), a musical event featuring an interactive piano synthesizer component. The project uses TypeScript, Tailwind CSS, and includes audio functionality with Howler.js.

### UI Design Philosophy

The landing page features a dynamic, layered design with:

- **Video Background**: Full-screen autoplay video loop with loading screen
- **Floating Content Blocks**: Semi-transparent content sections that float at different speeds during scrolling on desktop devices
- **Mobile-First Layout**: Stacked layout on mobile, floating parallax effect on desktop (md: breakpoint)

## Development Commands

### Core Commands

- `npm run dev` / `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier (uses \*_/_.astro pattern)
- `npm run clean` - Clean dist, .astro, and node_modules

### Testing

No test framework is currently configured in this project. If tests are added, update this section with the specific test commands.

## Code Style Guidelines

### File Structure

- **Pages**: `src/pages/` - Astro route files
- **Components**: `src/components/` - Reusable Astro components
- **Styles**: `src/styles/` - Global CSS files
- **Types**: `src/types.ts` - TypeScript type definitions (currently empty)
- **Assets**: `public/` - Static assets (images, sounds, icons)

### Import Conventions

```typescript
// Use ~ alias for src imports
import Component from "~/components/component.astro";
import "~/styles/global.css";

// External imports first, then internal imports
import { Howl } from "howler";
import { sounds } from "./sounds.ts";
```

### TypeScript/JavaScript

- Use TypeScript for all logic
- Define types in `src/types.ts` when creating complex data structures
- Use proper typing for function parameters and return values
- Use `const` by default, `let` only when reassignment is needed
- Use `NodeJS.Timeout` for setTimeout return values
- Use browser-native types for DOM elements (e.g., `SVGGElement`, `SVGElement`)

### Astro Component Patterns

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
- Use custom CSS variables defined in theme system
- Maintain consistent spacing with Tailwind's spacing scale

### Floating Blocks Implementation

The floating content blocks use a parallax scrolling effect with these characteristics:

#### Component Structure

```astro
<div class="overflow-visible pt-8 md:h-0 md:p-0 md:pl-4">
  <section
    class="fast-div mx-2 rounded-[3rem] bg-default p-8 opacity-85 md:absolute md:mr-auto md:w-[22rem]"
  >
    <!-- Content -->
  </section>
</div>
```

#### Parallax JavaScript Pattern

```javascript
const isMobile = () => window.innerWidth < 768;

if (!isMobile()) {
  const element = document.querySelector(".element-class") as HTMLElement;
  if (element) {
    let raf: number | null = null;
    const speedMultiplier = 2.65; // Unique speed for each block
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

#### Speed Multipliers by Block

- **Title Block**: Variable speed (2.65x, then 2x with wait time)
- **Main Text Block**: 2.65x speed multiplier
- **Tech Rider Block**: 1.3x speed multiplier
- **Contact/Synth Blocks**: No floating (static positioning)

#### Styling Guidelines

- Use `opacity-85` for semi-transparent backgrounds
- Apply `rounded-[3rem]` for consistent rounded corners
- Use `bg-default` (theme variable) for background colors
- Mobile: `mx-2` margins with responsive padding
- Desktop: `md:absolute` positioning with specific widths and offsets

### Naming Conventions

- **Files**: kebab-case (e.g., `synth-keyboard.astro`)
- **Components**: PascalCase (e.g., `SynthKeyboard`)
- **Functions**: camelCase (e.g., `pressKey`, `handleMouseDown`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `SOUNDS_DIRECTORY`)
- **CSS Classes**: kebab-case with Tailwind utilities
- **Types**: PascalCase (e.g., `NoteName`, `WhiteKey`, `BlackKey`)

### Error Handling

- Use `tiny-invariant` for runtime assertions where appropriate
- Check for null/undefined DOM elements before operations
- Handle browser API differences gracefully (e.g., AudioContext)
- Use optional chaining for safe property access

### Audio/Synth Component Guidelines

- Use Howler.js for audio playback
- Define sound sprite mappings with precise timing
- Support both touch and mouse events
- Handle keyboard events for accessibility
- Prevent default behaviors for audio interactions
- Clean up audio resources on unmount

### Configuration

- **Astro Config**: Simple setup with Tailwind and astro-icon integrations
- **Tailwind**: Extended theme with custom colors, fonts (Inter Variable), and fluid-type plugin
- **TypeScript**: Strict mode enabled with path mapping for ~ alias
- **Prettier**: Configured with astro and tailwindcss plugins

## Development Workflow

### Making Changes

1. Read existing files to understand patterns before editing
2. Follow the established file structure and naming conventions
3. Use the same libraries and patterns as existing code
4. Format code before committing: `npm run format`
5. Test changes in development: `npm run dev`

### Component Development

- Keep components focused and single-purpose
- Use props for configuration
- Separate client-side scripts in `<script>` blocks
- Use semantic HTML5 elements
- Implement proper event handling with cleanup

### Performance Considerations

- Use Astro islands for client-side interactivity
- Lazy load audio assets
- Optimize images and assets in public folder
- Use CSS transitions instead of JavaScript animations where possible
- Implement `requestAnimationFrame` throttling for scroll-based animations
- Use `{ passive: true }` for scroll event listeners to improve performance

## Tool Integration

This project uses:

- **Astro 5.7.4** with strict TypeScript configuration
- **Tailwind CSS 3.4.19** with custom theme and fluid-type plugin
- **Howler.js 2.2.4** for audio functionality
- **Prettier** with astro and tailwind plugins for formatting
- **SCSS** support via sass-embedded

Always check package.json for the latest versions and available scripts.
