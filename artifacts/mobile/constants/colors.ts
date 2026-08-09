/**
 * Deverdex design tokens — derived from the sibling web artifact's index.css.
 * Dark-mode-only brand (the web site is always dark).
 *
 * To add dark mode: add a `dark` key with the same token names.
 * useColors() will automatically pick it up.
 */

const colors = {
  light: {
    // Core surfaces
    background: '#080E14',
    foreground: '#F0F4FF',

    // Cards / elevated surfaces
    card: '#0A1220',
    cardForeground: '#F0F4FF',

    // Primary action — teal
    primary: '#00DCB9',
    primaryForeground: '#080E14',

    // Orange accent
    accent: '#FF6B35',
    accentForeground: '#080E14',

    // Secondary / elevated surfaces
    secondary: '#0D1726',
    secondaryForeground: '#F0F4FF',

    // Muted / subdued
    muted: '#0D1726',
    mutedForeground: '#6B7FA8',

    // Destructive
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: 'rgba(255,255,255,0.06)',
    input: '#0D1726',

    // Legacy alias
    text: '#F0F4FF',
    tint: '#00DCB9',

    // Deverdex-specific extras
    surface: '#0A1220',
    elevated: '#0D1726',
  },

  // Border radius matching web artifact's --radius: 0.5rem = 8px
  radius: 8,
};

export default colors;
