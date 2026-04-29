---
name: SurplusGrid
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393938'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1b'
  surface-container: '#1f201f'
  surface-container-high: '#2a2a29'
  surface-container-highest: '#353534'
  on-surface: '#e4e2e0'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e4e2e0'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c6'
  primary: '#c6c6c6'
  on-primary: '#2f3131'
  primary-container: '#767777'
  on-primary-container: '#040505'
  inverse-primary: '#5d5e5f'
  secondary: '#c7c6c6'
  on-secondary: '#303031'
  secondary-container: '#464747'
  on-secondary-container: '#b6b5b5'
  tertiary: '#cec5c1'
  on-tertiary: '#342f2d'
  tertiary-container: '#7c7572'
  on-tertiary-container: '#ffffff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e3e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#eae1dd'
  tertiary-fixed-dim: '#cec5c1'
  on-tertiary-fixed: '#1f1b19'
  on-tertiary-fixed-variant: '#4b4643'
  background: '#131313'
  on-background: '#e4e2e0'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 16px
  container-margin: 24px
---

## Brand & Style

This design system is built for the high-stakes environment of renewable energy trading and matching. The aesthetic is defined by **Industrial Precision**, utilizing a high-density information architecture that mirrors the functional efficiency of professional engineering software or trading terminals.

The style combines **Muted Minimalism** with **Technical Brutalism**. It prioritizes data clarity over decorative elements, employing a dark-mode-first approach to reduce eye strain during prolonged monitoring. The brand personality is authoritative, clinical, and reliable, using sharp structural lines and a monochromatic palette with "Warm Bone" highlights to signify calibrated control over complex grid data.

## Colors

The palette is engineered for a low-light command center environment. The primary **Steeled Gray** (#767777) is used for interactive elements, structural borders, and indicating established data connections. The secondary and neutral tones are neutral grays that provide subtle contrast for layered surfaces.

The accent **Warm Bone** (#fef4f0) is reserved for high-priority highlights, critical alerts, or "active" energy states. Functional colors—Warning and Danger—remain saturated to ensure immediate recognition against the dark backdrop. Surfaces use specific grayscale values to create a clear hierarchy of containment for complex data sets.

## Typography

The typography system relies on a dual-purpose stack to balance brand character with extreme legibility. **Space Grotesk** is used for headlines and UI labels, providing a technical, geometric edge that reinforces the industrial aesthetic. 

**Inter** serves as the workhorse for all body copy and tabular data. To replicate the precision of a trading platform, utilize Inter's "tnum" (tabular figures) OpenType feature for all numerical data to ensure vertical alignment in columns. Line heights are kept tight to support high information density, and a specialized "label-caps" style is used for secondary metadata to distinguish it from primary data points.

## Layout & Spacing

This design system uses a **fixed-fluid hybrid grid** based on a 4px baseline rhythm. The layout is optimized for widescreen dashboard consumption, utilizing a 12-column grid system with consistent 16px gutters.

Layouts should maximize "above the fold" visibility by using a compressed vertical scale. Content is organized into modular "panes" rather than sprawling pages. Spacing between related data points should be minimal (4px or 8px) to allow for the visual grouping of complex information, while larger gaps (24px+) are reserved for separating distinct functional modules.

## Elevation & Depth

Hierarchy in this design system is achieved through **Tonal Layering** and **Low-Contrast Outlines** rather than traditional shadows. This creates a flat, professional "instrument panel" feel.

- **Base Level:** The darkest neutral shade represents the background "void."
- **Level 1 (Panels/Cards):** Surfaces appear slightly lighter.
- **Level 2 (Modals/Popovers):** Surface containers with a 1px border of #767777 at 40% opacity.
- **Outlines:** Use 1px solid borders for all interactive elements. Avoid blur-based shadows; if depth is required, use a 1px offset highlight on the top edge to simulate a "bezel" effect.

## Shapes

The shape language is strictly controlled to maintain an industrial feel. A **Soft** (0.25rem) corner radius is the standard for most components, providing just enough refinement to feel modern without sacrificing the "grid-locked" authoritative appearance. 

Buttons and input fields follow this standard, while data points within tables remain sharp (0px) to maximize horizontal space and reinforce the spreadsheet-like precision required for energy matching tasks.

## Components

### Buttons & Controls
Buttons are categorized by "Utility." Primary buttons use a solid Steeled Gray fill with white text. Secondary buttons use a "Ghost" style: 1px border of the primary color with no fill, transitioning to a subtle Warm Bone (#fef4f0) border on hover.

### Inputs & Form Fields
Fields utilize the surface container color with a 1px border. The active state is indicated by a Warm Bone (#fef4f0) bottom border only, minimizing visual noise in complex forms.

### Data Grids (Core Component)
The central component of the design system. Grids must feature:
- Zebra striping using subtle color shifts between Background and Card colors.
- Column headers in "label-caps" typography.
- Monospaced numerical values for perfect alignment.
- Micro-sparklines (using #767777) embedded in rows to show energy trends.

### Chips & Status Indicators
Status indicators use a "dot + label" system. The dot uses the Warm Bone accent for "Active" states. Chips are rectangular with the standard 0.25rem radius, using low-opacity neutral background tints.

### Energy Cards
Specific to SurplusGrid, these cards summarize available energy loads. They feature a high-contrast header, a primary data point in "headline-lg" (Space Grotesk), and a technical footer with metadata in "body-sm" (Inter).