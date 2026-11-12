/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Star Landscape brand greens */
        primary: '#5A9E1F',
        primaryDark: '#47801A',
        forest: '#22400E',
        forestDeep: '#152B08',
        lime: '#9BED2B',
        limeSoft: '#D6F79E',
        mint: '#E4F8CE',
        /* Canvas & neutrals */
        cream: '#FBF8F2',
        sand: '#F3EEE3',
        charcoal: '#161A14',
        ink: '#2A3026',
        muted: '#6E7568',
        line: '#E6E2D6',
        teal: '#009490',
        danger: '#D64541',
        gold: '#F2C14E',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        caption: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '50px',
        box: '20px',
        card: '24px',
        xl2: '32px',
      },
      boxShadow: {
        card: '0 2px 4px -2px rgba(22,26,20,.04), 0 12px 32px -20px rgba(22,26,20,.22)',
        soft: '0 18px 46px -24px rgba(22,26,20,.28)',
        glow: '0 26px 60px -26px rgba(90,158,31,.55)',
        pill: '0 1px 17px rgba(0,0,0,.60)',
        lift: '0 30px 70px -34px rgba(22,26,20,.45)',
        nav: '0 12px 40px -18px rgba(22,26,20,.30)',
        inset: 'inset 0 1px 0 rgba(255,255,255,.6)',
      },
      maxWidth: {
        shell: '1320px',
      },
      spacing: {
        'section': 'clamp(4.5rem, 8vw, 7.5rem)',
        'gutter': 'clamp(1.25rem, 4.5vw, 4rem)',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatLeaf: {
          '0%': { transform: 'translate3d(0,0,0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.85' },
          '90%': { opacity: '0.75' },
          '100%': { transform: 'translate3d(var(--leaf-x, 40px), 110vh, 0) rotate(340deg)', opacity: '0' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(2.1)', opacity: '0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.9' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
          '50%': { transform: 'translateY(-9px) rotate(3deg)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'floatY 6s ease-in-out infinite',
        'float-slow': 'floatY 9s ease-in-out infinite',
        ripple: 'ripple 2.4s cubic-bezier(0.22,1,0.36,1) infinite',
        'pulse-ring': 'pulseRing 2.6s ease-out infinite',
        marquee: 'marquee 38s linear infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        spinSlow: 'spinSlow 22s linear infinite',
        bob: 'bob 5.5s ease-in-out infinite',
        'fade-up': 'fade-up .5s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
};
