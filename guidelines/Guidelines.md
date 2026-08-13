# 99 Roots Studio - Design System Guidelines

## General Guidelines

* Use the softer black (#151515) instead of pure black (#000000) throughout the site
* Maintain premium, minimalistic aesthetic with ample white space
* Use parallax scrolling effects for all major sections to enhance the premium feel
* Keep layouts responsive and well-structured using flexbox and grid
* Refactor code as you go to keep it clean and maintainable
* Keep file sizes small and put helper functions and components in their own files

---

## Design System

### Color Palette

**Primary Colors:**
* Background: `#151515` (soft black)
* Gold Accent: `#FF9D56`
* Text: White and white/80 opacity for body text

**Usage:**
* Main backgrounds should use `#151515`
* All accent elements (borders, highlights, headings) use the gold color `#FF9D56`
* Maintain high contrast for readability while preserving the elegant aesthetic

### Typography

**Fonts:**
* **Body Text**: Space Mono - Used for all body copy, paragraphs, and UI elements
* **Headings & Titles**: Roboto - Used for all section headings and major titles
* Do not override font size, font weight, or line-height unless specifically requested

**Font Implementation:**
* Import from Google Fonts or use system fonts as fallbacks
* Maintain consistent hierarchy across all sections

### Spacing & Layout

* Use ample white space to create a premium, uncluttered feel
* Sections should breathe with proper padding (typically 80-120px vertical on desktop)
* Content should be centered with max-width containers for readability
* Use grid layouts for artist cards and gallery items

---

## Component Guidelines

### Buttons

**Primary CTA Buttons:**
* Border: 2px solid gold (`#FF9D56`)
* Text: Gold color
* Background: Transparent
* Hover: Background becomes gold, text becomes black
* Padding: `px-8 sm:px-12 py-3 sm:py-4`
* Font: Uppercase, tracking-wider
* Always include `touch-manipulation` and `cursor-pointer` classes

**Example:**
```tsx
<button className="inline-block px-8 sm:px-12 py-3 sm:py-4 border-2 border-gold text-gold font-inter uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 hover:bg-gold hover:text-black touch-manipulation cursor-pointer">
  Book Now
</button>
```

### Navigation

* Fixed navigation with backdrop blur
* Logo centered or left-aligned
* Navigation links in gold that transition on hover
* Mobile: Hamburger menu with slide-in drawer

### Section Headers

* Use background images with dark overlay (40% opacity of `#151515`)
* Height: `h-[50vh] md:h-[60vh]`
* Content: Centered with parallax motion
* Include decorative elements (horizontal lines and diamond shapes in gold)

**Example Structure:**
```tsx
<div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat" 
     style={{ backgroundImage: 'linear-gradient(rgba(21, 21, 21, 0.4), rgba(21, 21, 21, 0.4)), url(IMAGE_URL)' }}>
  {/* Content */}
</div>
```

### Cards (Artist Cards)

* Background: Semi-transparent dark with backdrop blur
* Border: 1px solid gold with low opacity
* Hover: Scale slightly and increase border opacity
* Include artist photo, name, specialties, and CTA buttons
* Use motion.div for animations

### Gallery

* Automated slideshow: 4-second intervals with fade transitions
* Full-width images with proper aspect ratios
* Navigation dots at the bottom
* Optional: Lightbox for full-screen viewing

---

## Parallax Effects

All major sections should include parallax scrolling:

* Use `motion/react` library (formerly Framer Motion)
* Implement `useScroll` and `useTransform` hooks
* Target elements should have `ref` attached
* Typical transforms: Y-axis movement, opacity changes, scale adjustments

**Example:**
```tsx
const sectionRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"]
});
const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
```

---

## Navigation & Routing

* Use internal routing for all pages (React state-based navigation)
* Main pages: Home, Appointment/Booking, Artist Gallery, Shop, Coming Soon
* All booking buttons navigate to `/appointment` page (internal, not external Calendly)
* Artist cards link to individual artist gallery pages
* Include a back button on all sub-pages

---

## Images

* Use Unsplash for stock images (tattoo-related, dark aesthetic)
* Use `ImageWithFallback` component for new images
* Preserve all Figma-imported images and SVGs
* Background images: Use `bg-cover bg-center bg-no-repeat` with dark overlays
* Optimize for web (compress and lazy-load when possible)

---

## Forms

* External booking solution (Calendly or similar) for appointments
* Simple contact forms with validation
* Gold accents on focus states
* Error states in red with clear messaging

---

## Mobile Responsiveness

* All sections must be fully responsive
* Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)
* Touch targets minimum 44x44px
* Simplified layouts on mobile (single column)
* Reduce parallax intensity on mobile devices
* Test all interactive elements for touch usability

---

## Animation Guidelines

* Use subtle, smooth animations (duration: 0.8-1.2s)
* Fade-in effects for section reveals
* Parallax for depth and premium feel
* Hover states with smooth transitions (duration: 300ms)
* Avoid jarring or excessive motion

---

## Accessibility

* Maintain sufficient color contrast (gold on black, white on black)
* Include ARIA labels where needed
* Ensure keyboard navigation works
* Provide alternative text for images
* Test with screen readers

---

## Third-Party Integrations

* Instagram feed integration for gallery
* Google Maps embed for location
* External booking system (Calendly)
* Cookie consent banner (GDPR compliant)

---

## File Structure

```
/components
  /ui (Shadcn components)
  Navigation.tsx
  Hero.tsx
  Artists.tsx
  Gallery.tsx
  BookingSection.tsx
  AppointmentPage.tsx
  ArtistGalleryPage.tsx
  Footer.tsx
  Location.tsx
  ComingSoon.tsx
  etc.

/styles
  globals.css (Tailwind config and custom styles)

/utils
  (Helper functions and utilities)
```

---

## Best Practices

* Always preserve Figma-imported code structure and styling
* Only modify imported code when necessary for functionality
* Use semantic HTML elements
* Keep components modular and reusable
* Comment complex logic
* Test on multiple devices and browsers
* Maintain consistent naming conventions