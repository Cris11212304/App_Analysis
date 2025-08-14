/**
 * Tailwind CSS configuration for the interactive KPI analysis project.
 *
 * We extend the default theme with a fixed palette derived from the
 * corporate colours described in the prompt. Each named colour is
 * assigned to its corresponding RGB value so it's easy to reference
 * them in components via Tailwind utility classes. The font family
 * is set to Calibri with fallbacks.
 */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-dark': '#3047B0',
        'blue-med': '#0485FC',
        'blue-intermediate': '#4498F2',
        'blue-text': '#004984',
        violet: '#A02B93',
        orange: '#E97132',
        cyan: '#0F9ED5',
        green: '#196B24',
        'grey-box': '#D4D2CA',
        'grey-light': '#F2F2F2',
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Calibri', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};