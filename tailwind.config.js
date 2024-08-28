export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];

export const theme = {
  extend: {
    screens: {
      hh: { raw: '(hover: hover)' },
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
export const plugins = [require('@tailwindcss/aspect-ratio')];
