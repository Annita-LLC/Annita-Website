# Dark Mode Implementation Guide

This guide explains the enhanced dark and light mode implementation for fonts and content across all pages (excluding staff pages).

## Overview

The dark mode system has been enhanced with:
- CSS variables for consistent theming
- Improved typography and contrast
- Component utility classes
- Better accessibility and readability

## CSS Variables

### Text Colors
```css
--text-primary: Main text color
--text-secondary: Secondary text color  
--text-muted: Muted/less important text
--text-accent: Accent/emphasis text
--text-inverse: Inverse text (for contrast)
--text-link: Link color
--text-link-hover: Link hover color
```

### Background Colors
```css
--content-bg: Main background color
--content-bg-secondary: Secondary background
--content-bg-tertiary: Tertiary background
--content-border: Border color
--content-shadow: Shadow color
```

### Brand Colors
```css
--brand-primary: Primary brand color
--brand-secondary: Secondary brand color
--brand-accent: Accent brand color
--brand-success: Success state color
--brand-warning: Warning state color
--brand-error: Error state color
```

## Usage Examples

### 1. Using CSS Variables Directly

```css
.my-component {
  color: var(--text-primary);
  background-color: var(--content-bg);
  border: 1px solid var(--content-border);
}
```

### 2. Using Utility Components

```tsx
import { ThemeText, ThemeBg, BrandColor } from '@/components/ui/DarkModeUtilities'

// Text variants
<ThemeText variant="primary">Primary text</ThemeText>
<ThemeText variant="secondary">Secondary text</ThemeText>
<ThemeText variant="muted">Muted text</ThemeText>

// Background variants
<ThemeBg variant="primary">
  <ThemeText variant="primary">Content</ThemeText>
</ThemeBg>

// Brand colors
<BrandColor variant="primary">Brand primary</BrandColor>
<BrandColor variant="success">Success message</BrandColor>
```

### 3. Using Utility Classes

```tsx
import { themeClasses } from '@/components/ui/DarkModeUtilities'

<div className={themeClasses.text.primary}>Primary text</div>
<div className={themeClasses.bg.secondary}>Secondary background</div>
<a href="#" className={themeClasses.text.link + ' ' + themeClasses.text.linkHover}>
  Link
</a>
```

### 4. Custom Components

```tsx
import { useDarkMode } from '@/components/ui/DarkModeUtilities'

function MyComponent() {
  const { isDark } = useDarkMode()
  
  return (
    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <span className={isDark ? 'text-white' : 'text-gray-900'}>
        Themed content
      </span>
    </div>
  )
}
```

## Typography Improvements

### Responsive Headings
The typography now uses `clamp()` for responsive sizing:

```css
h1 { font-size: clamp(1.875rem, 4vw, 3rem); }
h2 { font-size: clamp(1.5rem, 3.5vw, 2.25rem); }
h3 { font-size: clamp(1.25rem, 3vw, 1.875rem); }
```

### Enhanced Readability
- Improved line height for better readability
- Better contrast ratios in both modes
- Optimized text selection colors
- Enhanced focus states

## Component Classes

### Cards
```css
.card {
  background-color: var(--content-bg);
  border-color: var(--content-border);
  box-shadow: var(--content-shadow) 0 2px 15px -3px;
}
```

### Forms
```css
.input {
  background-color: var(--content-bg);
  border-color: var(--content-border);
  color: var(--text-primary);
}

.input:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(199, 89, 48, 0.1);
}
```

### Navigation
```css
.nav-link {
  color: var(--text-secondary);
}

.nav-link:hover {
  color: var(--text-link-hover);
}

.nav-link.active {
  color: var(--text-link);
}
```

## Best Practices

### 1. Always Use Semantic Color Variables
```css
/* Good */
color: var(--text-primary);

/* Avoid */
color: #000000; /* Won't adapt to dark mode */
```

### 2. Provide Sufficient Contrast
- Use `--text-primary` for main content
- Use `--text-secondary` for supporting text
- Use `--text-muted` for less important information

### 3. Test Both Modes
Always test your components in both light and dark modes to ensure:
- Text remains readable
- Colors have sufficient contrast
- Interactive elements are clearly visible

### 4. Use Theme-Aware Components
Prefer using the provided utility components over custom implementations:

```tsx
// Preferred
<ThemeText variant="primary">Text</ThemeText>

// Alternative
<span className="text-[var(--text-primary)]">Text</span>
```

## Migration Guide

### Existing Components
To update existing components for the enhanced dark mode:

1. Replace hardcoded colors with CSS variables
2. Update component classes to use theme-aware utilities
3. Test in both light and dark modes

### Example Migration

**Before:**
```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h2 className="text-gray-900 dark:text-white">Title</h2>
  <p className="text-gray-600 dark:text-gray-300">Content</p>
</div>
```

**After:**
```tsx
<ThemeBg variant="primary">
  <ThemeText variant="primary">Title</ThemeText>
  <ThemeText variant="secondary">Content</ThemeText>
</ThemeBg>
```

## Testing

### Manual Testing
1. Use the theme toggle in the navigation
2. Test all interactive elements
3. Check readability and contrast
4. Verify focus states

### Automated Testing
Consider adding visual regression tests to ensure:
- Dark mode components render correctly
- No color contrast issues
- Consistent theming across pages

## Troubleshooting

### Common Issues

1. **Text not changing color**
   - Ensure you're using CSS variables, not hardcoded colors
   - Check that the component is within the ThemeProvider

2. **Poor contrast in dark mode**
   - Use appropriate text variants (`primary`, `secondary`, `muted`)
   - Avoid using light colors on dark backgrounds

3. **Theme not applying to staff pages**
   - Staff pages are intentionally excluded from theming
   - This is by design as specified in requirements

## Performance Considerations

- CSS variables are performant and widely supported
- Theme switching is instant and doesn't require page reload
- Utility components are lightweight and tree-shakeable

## Browser Support

The enhanced dark mode supports:
- All modern browsers
- CSS variables (IE 11+ with fallbacks)
- Responsive typography with clamp() (fallbacks available)

## Future Enhancements

Potential improvements for future versions:
- System theme detection improvements
- Custom theme presets
- Advanced color contrast adjustments
- Theme persistence improvements
