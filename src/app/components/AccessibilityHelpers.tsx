import { useEffect } from 'react';

/**
 * Accessibility helpers and ARIA improvements
 */
export function AccessibilityHelpers() {
  useEffect(() => {
    // Add skip to main content link
    const addSkipLink = () => {
      if (!document.querySelector('.skip-to-main')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-to-main';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
          position: absolute;
          left: -9999px;
          z-index: 999;
          padding: 1em;
          background-color: #FF9D56;
          color: #151515;
          text-decoration: none;
          font-weight: bold;
        `;
        
        skipLink.addEventListener('focus', () => {
          skipLink.style.left = '0';
        });
        
        skipLink.addEventListener('blur', () => {
          skipLink.style.left = '-9999px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
      }
    };

    addSkipLink();

    // Ensure all links have proper aria-labels
    const enhanceLinks = () => {
      const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
      links.forEach((link) => {
        const text = link.textContent?.trim();
        if (text && text.length < 2) {
          // Very short text likely needs better labeling
          const href = link.getAttribute('href');
          if (href?.includes('instagram')) {
            link.setAttribute('aria-label', 'Visit our Instagram page');
          } else if (href?.includes('facebook')) {
            link.setAttribute('aria-label', 'Visit our Facebook page');
          } else if (href?.includes('mailto')) {
            link.setAttribute('aria-label', 'Send us an email');
          }
        }
      });
    };

    // Ensure all buttons have proper aria-labels
    const enhanceButtons = () => {
      const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      buttons.forEach((button) => {
        const text = button.textContent?.trim();
        if (!text || text.length === 0) {
          // Button with no text needs aria-label
          const icon = button.querySelector('svg');
          if (icon) {
            button.setAttribute('aria-label', 'Action button');
          }
        }
      });
    };

    // Ensure form inputs have associated labels
    const enhanceFormInputs = () => {
      const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
      inputs.forEach((input) => {
        const id = input.getAttribute('id');
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          if (!label) {
            // Input has ID but no label - might need aria-label
            const placeholder = input.getAttribute('placeholder');
            if (placeholder) {
              input.setAttribute('aria-label', placeholder);
            }
          }
        }
      });
    };

    // Add language attributes to content in different languages
    const enhanceLanguageAttributes = () => {
      // This would be useful if you have mixed language content
      const germanElements = document.querySelectorAll('[data-lang="de"]');
      germanElements.forEach((el) => {
        el.setAttribute('lang', 'de');
      });
    };

    // Run enhancements after DOM is ready
    setTimeout(() => {
      enhanceLinks();
      enhanceButtons();
      enhanceFormInputs();
      enhanceLanguageAttributes();
    }, 1000);

    // Add keyboard navigation helpers
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      // Show focus outline for keyboard users
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyboardNavigation);
    document.addEventListener('mousedown', handleMouseDown);

    // Add focus-visible styles
    const addFocusStyles = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        /* Focus styles for keyboard navigation */
        body.keyboard-navigation *:focus {
          outline: 2px solid #FF9D56 !important;
          outline-offset: 2px !important;
        }
        
        /* Hide focus outline for mouse users */
        body:not(.keyboard-navigation) *:focus {
          outline: none;
        }
        
        /* Ensure interactive elements are keyboard accessible */
        [role="button"]:not([tabindex]) {
          cursor: pointer;
        }
        
        /* Improve readability */
        ::selection {
          background-color: #FF9D56;
          color: #151515;
        }
      `;
      document.head.appendChild(style);
    };

    addFocusStyles();

    return () => {
      document.removeEventListener('keydown', handleKeyboardNavigation);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return null;
}

/**
 * ARIA live region for dynamic content announcements
 */
export function LiveRegion() {
  return (
    <>
      {/* Polite announcements (non-urgent) */}
      <div
        id="aria-live-polite"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      
      {/* Assertive announcements (urgent) */}
      <div
        id="aria-live-assertive"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />
    </>
  );
}

/**
 * Utility function to announce messages to screen readers
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const liveRegion = document.getElementById(`aria-live-${priority}`);
  if (liveRegion) {
    liveRegion.textContent = message;
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
};
