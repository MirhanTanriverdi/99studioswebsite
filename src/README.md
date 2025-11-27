# 99 Roots Studio - Premium Tattoo & Art Studio Website

A modern, minimalistic, and premium website for **99 Roots Studio**, a high-end tattoo and art studio based in Berlin. The website showcases custom, fine-line, and realism tattoos with an artistic, confident, and elegant design.

![99 Roots Studio](https://img.shields.io/badge/Status-Production_Ready-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)

---

## 🎨 Design Philosophy

The website embodies a **premium, minimalistic aesthetic** with:
- **Black background** (#000000) as the foundation
- **Gold accents** (#C89D53) for typography and highlights
- **Balanced white space** for breathing room and elegance
- **Parallax scrolling** throughout for an immersive experience
- **Smooth transitions and fade effects** for sophistication
- **Symmetry and contrast** as core design principles

---

## ✨ Key Features

### 🏠 Main Features
- **Full-screen Hero Section** with studio logo and call-to-action
- **Artists Showcase** with individual gallery pages for each artist
- **Instagram Gallery Feed** integration
- **Interactive FAQ Section** for common questions
- **Contact & Location** with embedded Google Maps
- **Appointment Booking System** with external integration
- **Shop Section** with "Coming Soon" page
- **Mobile-Optimized** responsive design throughout

### 🎭 Advanced Features
- **Comprehensive Parallax Scrolling** on all major sections
- **Artist Gallery Pages** with individual portfolios
- **Lightbox Image Viewer** (full-screen on mobile)
- **Smooth Page Transitions** with fade effects
- **Video Background Sections** for dynamic content
- **Toast Notifications** for user feedback

---

## 🛠️ Tech Stack

### Core Technologies
- **React 18.x** - UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first styling
- **Motion (Framer Motion)** - Advanced animations and parallax effects

### UI Components
- **shadcn/ui** - High-quality, accessible component library
- **Lucide React** - Icon system
- **Sonner** - Toast notifications

### Development Tools
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## 📁 Project Structure

```
99-roots-studio/
├── components/
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── accordion.tsx
│   │   └── ... (30+ components)
│   │
│   ├── figma/                       # Figma integration utilities
│   │   └── ImageWithFallback.tsx
│   │
│   ├── Artists.tsx                  # Artists section with parallax
│   ├── ArtistGalleryPage.tsx       # Individual artist galleries
│   ├── Hero.tsx                     # Full-screen hero section
│   ├── Gallery.tsx                  # Instagram gallery feed
│   ├── Navigation.tsx               # Main navigation
│   ├── Footer.tsx                   # Footer component
│   ├── BookingSection.tsx          # Appointment booking
│   ├── AppointmentPage.tsx         # Appointment form page
│   ├── TattooCare.tsx              # FAQ section
│   ├── Location.tsx                 # Location with Google Maps
│   ├── Shop.tsx                     # Shop section
│   ├── ShopPage.tsx                # Shop page
│   ├── ComingSoon.tsx              # Coming soon page
│   ├── VideoSection.tsx            # Video backgrounds
│   ├── BehindTheScenes.tsx         # Behind the scenes (optional)
│   ├── YourStoryOurCanvas.tsx      # Story section (optional)
│   └── RequestAppointment.tsx      # Appointment request (optional)
│
├── styles/
│   └── globals.css                  # Global styles & design tokens
│
├── App.tsx                          # Main application entry
├── Attributions.md                  # Asset attributions
└── README.md                        # This file
```

---

## 🎨 Design System

### Color Palette
```css
--studio-black: #000000    /* Primary background */
--studio-gold: #C89D53     /* Accent color for typography */
--studio-white: #FFFFFF    /* Text and contrast */
--studio-gray: #D1D1D1     /* Secondary text */
```

### Typography
- **Headings:** Playfair Display (Elegant serif)
- **Body Text:** Inter (Clean sans-serif)

### Spacing & Layout
- **Container Padding:**
  - Mobile: `px-4 py-8`
  - Tablet: `px-8 py-16`
  - Desktop: `px-[87px] py-[100px]`

- **Grid Gaps:**
  - Mobile: `gap-6`
  - Tablet: `gap-8`
  - Desktop: `gap-10`

### Responsive Breakpoints
```css
sm: 640px   /* Tablets */
md: 768px   /* Small laptops */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large screens */
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/99-roots-studio.git
   cd 99-roots-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 📄 Component Documentation

### Main Components

#### **Hero Section** (`Hero.tsx`)
- Full-screen landing with studio logo
- Parallax scrolling background
- Call-to-action for appointments

#### **Artists Section** (`Artists.tsx`)
- Grid layout showcasing studio artists
- Individual "View Gallery" buttons
- Video background with parallax effects
- Mobile-optimized with 1-column layout

#### **Artist Gallery Page** (`ArtistGalleryPage.tsx`)
- Individual portfolio for each artist
- Lightbox image viewer
- 2-column grid on mobile, 3-column on desktop
- Full-screen image display on mobile
- Artist navigation between galleries

#### **Gallery** (`Gallery.tsx`)
- Instagram feed integration
- Masonry grid layout
- Responsive image loading

#### **Location** (`Location.tsx`)
- Embedded Google Maps
- Contact information
- Address and directions

#### **Tattoo Care (FAQ)** (`TattooCare.tsx`)
- Accordion-style FAQ section
- Aftercare instructions
- Common questions answered

#### **Booking Section** (`BookingSection.tsx`)
- Call-to-action for appointments
- External booking integration
- Smooth page transitions

#### **Navigation** (`Navigation.tsx`)
- Sticky header on scroll
- Smooth scroll to sections
- Mobile hamburger menu

---

## 🎬 Parallax Implementation

The website uses **Motion (Framer Motion)** for comprehensive parallax scrolling:

### Parallax Techniques Used:
1. **Scroll-triggered animations** with `useScroll` hook
2. **Transform values** using `useTransform`
3. **Viewport-based animations** with `whileInView`
4. **Scale and Y-axis transformations** for depth

### Example Implementation:
```tsx
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"]
});

const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
const y = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);
```

---

## 📱 Mobile Optimization

### Mobile-Specific Features:
- **2-column gallery grids** on mobile devices
- **Full-screen lightbox images** when clicked
- **Removed hover effects** for touch interfaces
- **Optimized padding and spacing** for smaller screens
- **Touch-friendly button sizes** (minimum 44x44px)
- **Responsive typography scaling**

---

## 🔧 Customization Guide

### Changing Colors
Edit `/styles/globals.css`:
```css
:root {
  --studio-black: #000000;
  --studio-gold: #C89D53;  /* Change this for accent color */
  --studio-white: #FFFFFF;
}
```

### Adding New Artists
Edit `/components/Artists.tsx`:
```tsx
const artists: Artist[] = [
  {
    id: 8,
    name: 'Your Artist Name',
    style: 'Your Style',
    bio: 'Artist bio...',
    instagram: '@handle',
    image: 'image-url'
  }
];
```

### Modifying Sections
- Enable/disable sections in `App.tsx`
- Sections are commented out with `{/* */}`
- Uncomment to enable optional sections

---

## 🌐 External Integrations

### Required Integrations:
1. **Google Maps API** - Location section (requires API key)
2. **Booking System** - External appointment booking
3. **Instagram API** - Gallery feed (optional)

### Setup Instructions:
- Replace placeholder API keys in respective components
- Configure external booking URL in `BookingSection.tsx`
- Update Google Maps embed code in `Location.tsx`

---

## 🎯 Performance Optimization

- **Lazy loading** for images and videos
- **Optimized parallax** with transform instead of position
- **Compressed video assets** for faster loading
- **Minimal bundle size** with tree-shaking
- **Code splitting** for page components
- **Responsive images** with multiple breakpoints

---

## 🧪 Testing

### Recommended Testing:
- ✅ Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsiveness (iOS & Android)
- ✅ Touch interactions on mobile devices
- ✅ Parallax smoothness on different devices
- ✅ Form validation and submissions
- ✅ Image loading and fallbacks

---

## 📦 Deployment

### Build for Production:
```bash
npm run build
```

### Recommended Hosting:
- **Vercel** (Recommended for React apps)
- **Netlify**
- **GitHub Pages**
- **AWS Amplify**

### Environment Variables:
Create `.env` file for production:
```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key
VITE_BOOKING_URL=your_booking_url
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is proprietary and confidential for **99 Roots Studio**.

---

## 👥 Credits

### Development
- **Built with:** React, TypeScript, Tailwind CSS, Motion
- **UI Components:** shadcn/ui
- **Icons:** Lucide React

### Assets
- **Images:** Unsplash (see Attributions.md)
- **Videos:** Pexels
- **Fonts:** Google Fonts (Playfair Display, Inter)

---

## 📞 Support

For questions or support, please contact:
- **Email:** info@99rootsstudio.com
- **Instagram:** @99rootsstudio
- **Location:** Berlin, Germany

---

## 🗺️ Roadmap

### Planned Features:
- [ ] E-commerce integration for merchandise
- [ ] Online consultation booking system
- [ ] Artist portfolio CMS
- [ ] Blog/News section
- [ ] Multi-language support (English/German)
- [ ] Dark/Light mode toggle
- [ ] Enhanced analytics integration

---

**Built with ❤️ for 99 Roots Studio**
