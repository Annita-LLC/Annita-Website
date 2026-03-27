'use client'

import { ThemeText, ThemeBg, ThemeBorder, BrandColor, themeClasses } from './DarkModeUtilities'

/**
 * Test component to verify dark mode functionality
 * This should be used temporarily to test the enhanced theming
 */
export default function ThemeTest() {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Dark Mode Theme Test</h2>
      
      {/* Text variants */}
      <ThemeBg variant="primary" className="p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Text Variants</h3>
        <ThemeText variant="primary" className="block mb-1">Primary Text</ThemeText>
        <ThemeText variant="secondary" className="block mb-1">Secondary Text</ThemeText>
        <ThemeText variant="muted" className="block mb-1">Muted Text</ThemeText>
        <ThemeText variant="accent" className="block mb-1">Accent Text</ThemeText>
        <ThemeText variant="inverse" className="block">Inverse Text</ThemeText>
      </ThemeBg>
      
      {/* Background variants */}
      <div className="grid grid-cols-3 gap-4">
        <ThemeBg variant="primary" className="p-4 rounded-lg border">
          <h4 className="font-semibold mb-2">Primary BG</h4>
          <ThemeText variant="primary">Content on primary background</ThemeText>
        </ThemeBg>
        <ThemeBg variant="secondary" className="p-4 rounded-lg border">
          <h4 className="font-semibold mb-2">Secondary BG</h4>
          <ThemeText variant="primary">Content on secondary background</ThemeText>
        </ThemeBg>
        <ThemeBg variant="tertiary" className="p-4 rounded-lg border">
          <h4 className="font-semibold mb-2">Tertiary BG</h4>
          <ThemeText variant="primary">Content on tertiary background</ThemeText>
        </ThemeBg>
      </div>
      
      {/* Brand colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-2">Brand Colors</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <BrandColor variant="primary" className="text-2xl font-bold">Primary</BrandColor>
          </div>
          <div className="text-center">
            <BrandColor variant="secondary" className="text-2xl font-bold">Secondary</BrandColor>
          </div>
          <div className="text-center">
            <BrandColor variant="accent" className="text-2xl font-bold">Accent</BrandColor>
          </div>
          <div className="text-center">
            <BrandColor variant="success" className="text-2xl font-bold">Success</BrandColor>
          </div>
          <div className="text-center">
            <BrandColor variant="warning" className="text-2xl font-bold">Warning</BrandColor>
          </div>
          <div className="text-center">
            <BrandColor variant="error" className="text-2xl font-bold">Error</BrandColor>
          </div>
        </div>
      </div>
      
      {/* Typography test */}
      <ThemeBg variant="secondary" className="p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Typography Test</h3>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Heading 1</h1>
          <h2 className="text-2xl font-bold">Heading 2</h2>
          <h3 className="text-xl font-bold">Heading 3</h3>
          <h4 className="text-lg font-bold">Heading 4</h4>
          <h5 className="text-base font-bold">Heading 5</h5>
          <h6 className="text-sm font-bold">Heading 6</h6>
          <p className="text-base leading-relaxed">
            This is a paragraph of text that should adapt properly to dark and light themes. 
            The text color should remain readable and comfortable in both modes.
          </p>
          <p className="text-sm">
            This is smaller text that uses the muted color variant for less important content.
          </p>
        </div>
      </ThemeBg>
      
      {/* Links test */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-2">Links</h3>
        <div className="space-y-2">
          <a href="#" className={themeClasses.text.link}>Regular Link</a>
          <br />
          <a href="#" className={themeClasses.text.link + ' ' + themeClasses.text.linkHover}>Hover Link</a>
        </div>
      </div>
      
      {/* Form elements test */}
      <ThemeBg variant="secondary" className="p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Form Elements</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Input Label</label>
            <input 
              type="text" 
              placeholder="Enter text..."
              className="w-full px-3 py-2 rounded-lg border bg-[var(--content-bg)] text-[var(--text-primary)] border-[var(--content-border)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Textarea</label>
            <textarea 
              placeholder="Enter message..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border bg-[var(--content-bg)] text-[var(--text-primary)] border-[var(--content-border)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
            />
          </div>
        </div>
      </ThemeBg>
      
      {/* Code and blockquote test */}
      <div className="space-y-4">
        <div className="bg-[var(--content-bg-secondary)] border border-[var(--content-border)] rounded-lg p-4">
          <code className="text-[var(--text-primary)]">console.log('Dark mode test');</code>
        </div>
        <blockquote className="border-l-4 border-[var(--brand-primary)] bg-[var(--content-bg-secondary)] p-4 rounded-r-lg">
          <p className="text-[var(--text-secondary)] italic">
            This is a blockquote that should adapt to dark and light themes with proper contrast.
          </p>
        </blockquote>
      </div>
    </div>
  )
}
