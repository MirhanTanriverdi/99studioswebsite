import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export function SEO({
  title = '99 Roots Studio - Premium Tattoo Studio in Berlin | Fine Line & Realism Tattoos',
  description = 'Experience premium custom tattoos in Berlin at 99 Roots Studio. Specializing in fine-line, realism, and custom tattoo art. Professional artists, sterile environment, and personalized designs. Book your consultation today.',
  keywords = 'tattoo studio Berlin, custom tattoos, fine line tattoos, realism tattoos, Berlin tattoo artists, premium tattoo studio, 99 Roots Studio, tattoo Berlin, professional tattoo artist, custom tattoo designs, tattoo parlor Berlin, best tattoo studio Berlin',
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1590246814883-57c511ad64ad?auto=format&fit=crop&w=1200&h=630&q=80',
  canonicalUrl = 'https://99roots-studio.com',
  structuredData
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', '99 Roots Studio');
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Language
    document.documentElement.lang = 'en';
    
    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:site_name', '99 Roots Studio', true);
    setMetaTag('og:locale', 'en_US', true);
    setMetaTag('og:locale:alternate', 'de_DE', true);
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);
    
    // Additional SEO tags
    setMetaTag('theme-color', '#151515');
    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    
    // Geo tags for local SEO
    setMetaTag('geo.region', 'DE-BE');
    setMetaTag('geo.placename', 'Berlin');
    setMetaTag('geo.position', '52.520008;13.404954');
    setMetaTag('ICBM', '52.520008, 13.404954');
    
    // Business category
    setMetaTag('article:author', '99 Roots Studio');
    setMetaTag('category', 'Tattoo Studio, Art Studio, Body Art');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, ogType, ogImage, canonicalUrl, structuredData]);

  return null;
}

// Structured data for the business
export const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  "@id": "https://99roots-studio.com/#organization",
  "name": "99 Roots Studio",
  "alternateName": "99 Roots Tattoo Studio Berlin",
  "description": "Premium tattoo studio in Berlin specializing in fine-line, realism, and custom tattoo art. Professional artists creating unique, personalized designs in a sterile, premium environment.",
  "url": "https://99roots-studio.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://99roots-studio.com/logo.png",
    "width": "600",
    "height": "60"
  },
  "image": [
    "https://images.unsplash.com/photo-1590246814883-57c511ad64ad?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1200&q=80"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Berlin",
    "addressLocality": "Berlin",
    "addressRegion": "BE",
    "postalCode": "10115",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.520008",
    "longitude": "13.404954"
  },
  "telephone": "+49-30-XXXXXXXX",
  "email": "info99roots@gmail.com",
  "priceRange": "€€€",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "11:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "12:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/99rootsstudio",
    "https://www.facebook.com/99rootsstudio"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "areaServed": {
    "@type": "City",
    "name": "Berlin"
  },
  "paymentAccepted": "Cash, Credit Card, Debit Card",
  "currenciesAccepted": "EUR",
  "knowsAbout": [
    "Fine Line Tattoos",
    "Realism Tattoos",
    "Custom Tattoo Design",
    "Cover-Up Tattoos",
    "Black and Grey Tattoos",
    "Color Tattoos"
  ]
};

// Page-specific structured data generators
export const getAppointmentStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://99roots-studio.com/appointment#webpage",
  "url": "https://99roots-studio.com/appointment",
  "name": "Book Appointment - 99 Roots Studio",
  "description": "Schedule your tattoo consultation at 99 Roots Studio. Our professional artists are ready to bring your vision to life.",
  "isPartOf": {
    "@id": "https://99roots-studio.com/#organization"
  },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://images.unsplash.com/photo-1590246814883-57c511ad64ad?auto=format&fit=crop&w=1200&q=80"
  }
});

export const getArtistStructuredData = (artistName: string, artistBio: string, artistImage: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `https://99roots-studio.com/artist/${artistName.toLowerCase().replace(/\s/g, '-')}#person`,
  "name": artistName,
  "description": artistBio,
  "image": artistImage,
  "jobTitle": "Tattoo Artist",
  "worksFor": {
    "@id": "https://99roots-studio.com/#organization"
  },
  "knowsAbout": ["Tattoo Art", "Fine Line Tattoos", "Custom Design"]
});

// Breadcrumb structured data
export const getBreadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// FAQ structured data
export const getFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
