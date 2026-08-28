/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        memora: {
          light: '#F5F5F7',
          dark: '#000000',
          'secondary-bg': '#1C1C1E',
          'card': '#FFFFFF',
          'card-dark': '#2C2C2E',
          'border': 'rgba(0,0,0,0.06)',
          purple: '#6E5BFF',
          'purple-dark': '#5846E8',
          'purple-light': '#8B7CFF',
        },
        primary: '#1D1D1F',
        secondary: '#86868B',
        'secondary-dark': '#98989D',
        success: '#34C759',
        'success-dark': '#30D158',
        danger: '#FF3B30',
        'danger-dark': '#FF453A',
        warning: '#FF9F0A',
      },
      fontFamily: {
        'sf-display': ['SF Pro Display', 'system-ui', 'sans-serif'],
        'sf-text': ['SF Pro Text', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-1.5px' }],
        'title': ['36px', { lineHeight: '1.2', fontWeight: '600' }],
        'subtitle': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'body': ['17px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['15px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
        'caption-sm': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '24px',
      },
      backdropBlur: {
        'xl': '20px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'slideUp': 'slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      },
      spacing: {
        'safe-top': 'max(env(safe-area-inset-top), 1rem)',
        'safe-bottom': 'max(env(safe-area-inset-bottom), 1rem)',
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
