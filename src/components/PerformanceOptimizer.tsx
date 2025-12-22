import { useEffect } from 'react';

/**
 * Performance optimization component that adds various SEO and performance improvements
 */
export function PerformanceOptimizer() {
  useEffect(() => {
    // Add preconnect for external resources
    const addPreconnect = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        document.head.appendChild(link);
      }
    };

    // Preconnect to common external domains
    addPreconnect('https://fonts.googleapis.com');
    addPreconnect('https://images.unsplash.com');
    
    // Add DNS prefetch for additional domains
    const addDnsPrefetch = (href: string) => {
      if (!document.querySelector(`link[rel="dns-prefetch"][href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = href;
        document.head.appendChild(link);
      }
    };

    addDnsPrefetch('https://www.google-analytics.com');
    addDnsPrefetch('https://www.googletagmanager.com');

    // Add resource hints for better performance
    const addPreload = (href: string, as: string, type?: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (type) link.type = type;
        document.head.appendChild(link);
      }
    };

    // Preload critical fonts (if using local fonts)
    // Uncomment if you have local fonts
    // addPreload('/fonts/roboto-regular.woff2', 'font', 'font/woff2');
    // addPreload('/fonts/space-mono-regular.woff2', 'font', 'font/woff2');

    // Add security headers via meta tags
    const addSecurityMeta = (httpEquiv: string, content: string) => {
      if (!document.querySelector(`meta[http-equiv="${httpEquiv}"]`)) {
        const meta = document.createElement('meta');
        meta.httpEquiv = httpEquiv;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Content Security Policy (basic - adjust as needed)
    addSecurityMeta('Content-Security-Policy', "default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';");
    
    // X-Content-Type-Options
    addSecurityMeta('X-Content-Type-Options', 'nosniff');
    
    // Referrer Policy
    addSecurityMeta('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Optimize images - add loading="lazy" to all images without it
    const optimizeImages = () => {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach((img) => {
        // Don't lazy load images in viewport on initial load
        const rect = img.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInViewport) {
          img.setAttribute('loading', 'lazy');
        }
      });
    };

    // Run after a short delay to ensure DOM is ready
    setTimeout(optimizeImages, 1000);

    // Service Worker registration (if you have one)
    // Uncomment and adjust path if you want to add a service worker
    /*
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => console.log('SW registered:', registration))
          .catch(error => console.log('SW registration failed:', error));
      });
    }
    */

  }, []);

  return null;
}

/**
 * Analytics integration placeholder
 * In production, you would integrate Google Analytics, Google Tag Manager, etc.
 */
export function Analytics() {
  useEffect(() => {
    // Google Analytics placeholder
    // Replace with your actual GA tracking ID
    /*
    const GA_TRACKING_ID = 'G-XXXXXXXXXX';
    
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(script2);
    */

    // Track page views on route changes (for SPA)
    // You would call this function whenever the route changes
    const trackPageView = (path: string) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'GA_TRACKING_ID', {
          page_path: path,
        });
      }
    };

    // Facebook Pixel placeholder
    /*
    const FB_PIXEL_ID = 'XXXXXXXXXXXXXXX';
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FB_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1"/>`;
    document.body.appendChild(noscript);
    */

  }, []);

  return null;
}
