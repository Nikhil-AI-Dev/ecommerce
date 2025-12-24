/**
 * Mock UI Store
 * Centralized store for UI configuration including color palette, theme, and hero section features
 */

// Color Palette
export const colorPalette = {
  // Primary Colors
  primary: '#5E0B15', // Deep rich maroon
  secondary: '#D4AF37', // Gold
  accent: '#800000', // Maroon variant

  // Background Colors
  background: '#FDFBF7', // Soft cream
  backgroundLight: '#FFFBF0', // Light cream
  backgroundDark: '#2C1810', // Dark brown-black
  white: '#FFFFFF',

  // Text Colors
  textMain: '#2C1810', // Dark brown-black for text
  textLight: '#6D6D6D', // Gray for secondary text
  textWhite: '#FFFFFF',

  // UI Colors
  border: '#E5E5E5',
  borderLight: '#F0F0F0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',

  // Status Colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',

  // Gradient Colors
  gradients: {
    heroBackground: 'radial-gradient(circle at center, #fffbf0 0%, #fff0f5 100%)',
    textGradient: 'linear-gradient(45deg, #2C1810, #800000)',
    primaryGradient: 'linear-gradient(135deg, #5E0B15 0%, #800000 100%)',
  },
};

// Theme Configuration
export const theme = {
  colors: colorPalette,

  // Typography
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Lato', sans-serif",
    variables: {
      heading: '--font-playfair',
      body: '--font-lato',
    },
  },

  // Font Sizes
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px',
    '5xl': '64px',
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '48px',
    '2xl': '64px',
    '3xl': '80px',
  },

  // Border Radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '50px',
    circle: '50%',
  },

  // Shadows
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 25px -5px rgba(128, 0, 0, 0.3)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.1)',
  },

  // Transitions
  transitions: {
    fast: '0.15s ease',
    base: '0.2s ease',
    slow: '0.3s ease',
  },

  // Breakpoints (for responsive design)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// Hero Section Features/Configuration
export const heroSection = {
  // Hero Content
  content: {
    badge: {
      text: 'Sri Lakshmi Narayana Handlooms',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      fontSize: '16px',
      fontWeight: 'bold',
      color: theme.colors.secondary,
    },
    title: {
      text: 'Artisanal Elegance',
      fontSize: '72px',
      lineHeight: '1.2',
      gradient: 'linear-gradient(to right, #D4AF37, #FFFBF0)',
      breakLine: false,
    },
    subtitle: {
      text: "Discover the timeless grandeur of hand-woven sarees. Each creation at Sri Lakshmi Narayana Handlooms is an artisanal masterpiece, crafted for life's most precious moments.",
      fontSize: '20px',
      maxWidth: '500px',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.8)',
    },
  },

  // Hero Buttons
  buttons: {
    primary: {
      text: 'Shop Collection',
      href: '/shop',
      variant: 'primary',
      fontSize: '18px',
      padding: '16px 40px',
      borderRadius: '4px', // More square/premium look
      boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
    },
    secondary: {
      text: 'Our Story',
      href: '/about',
      variant: 'outline',
      fontSize: '18px',
      padding: '16px 40px',
      borderRadius: '4px',
    },
  },

  // Hero Background & Decorative Elements
  background: {
    gradient: 'linear-gradient(135deg, #4A0910 0%, #2C1810 100%)', // Deep maroon to dark
    padding: '120px 0',
    decorativeElements: [
      {
        position: { top: '0', right: '0' },
        size: { width: '50%', height: '100%' },
        type: 'image', // We'll handle this in the component
        url: '/artifacts/premium_saree_hero_model.png', // Placeholder for the generated image
      }
    ],
  },

  // Hero Layout
  layout: {
    textAlign: 'left', // Changed from center to left as per mock
    position: 'relative',
    overflow: 'hidden',
    minHeight: '700px',
    display: 'flex',
    alignItems: 'center',
  },
};

// Button Variants
export const buttonVariants = {
  primary: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.secondary,
    border: `1px solid ${theme.colors.primary}`,
    hover: {
      backgroundColor: '#4a0910',
      transform: 'translateY(-2px)',
    },
  },
  secondary: {
    backgroundColor: 'transparent',
    color: theme.colors.primary,
    border: `1px solid ${theme.colors.primary}`,
    hover: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
    },
  },
  outline: {
    backgroundColor: 'transparent',
    color: theme.colors.primary,
    border: `1px solid ${theme.colors.primary}`,
    hover: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.white,
    },
  },
};

// Container Styles
export const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${theme.spacing.md}`,
};

// Default UI Store Export
const uiStore = {
  colors: colorPalette,
  theme,
  hero: heroSection,
  buttons: buttonVariants,
  container: containerStyles,
};

export default uiStore;

