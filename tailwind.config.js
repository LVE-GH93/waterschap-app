/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        water: {
          50: '#EFF8FF',
          100: '#DBF0FE',
          200: '#B9E2FD',
          300: '#7CCDFB',
          400: '#37AFF6',
          500: '#0C95E9',
          600: '#0076C6',
          700: '#015EA0',
          800: '#064F84',
          900: '#0A426D',
        },
        earth: {
          50: '#F8F3EC',
          100: '#EDE3D2',
          200: '#D9C5A5',
          300: '#C4A06F',
          400: '#B4844A',
          500: '#9A6B38',
          600: '#7D5430',
          700: '#62412A',
          800: '#503728',
          900: '#3D2B1F',
        },
        meadow: {
          50: '#F0F9E8',
          100: '#DCF0C8',
          200: '#BBE29A',
          300: '#8FCC60',
          400: '#6AB535',
          500: '#508C22',
          600: '#3D6E1A',
          700: '#305618',
          800: '#284519',
          900: '#1F3514',
        },
      },
      animation: {
        'flow': 'flow 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'wave': 'wave 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'dash': 'dash 2s linear infinite',
      },
      keyframes: {
        flow: {
          '0%': { 'stroke-dashoffset': '200' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        dash: {
          to: { 'stroke-dashoffset': '-20' },
        },
      },
    },
  },
  plugins: [],
}
