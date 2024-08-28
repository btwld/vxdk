const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
    remarkPlugins: [],
    rehypePrettyCodeOptions: {
      // VSCode theme or built-in Shiki theme, see Shiki documentation for more information
      theme: { light: 'github-dark', dark: 'github-dark' },
    },
  },
});

// eslint-disable-next-line no-undef
module.exports = withNextra({
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/docs/changelog',
        destination: 'https://github.com/btwld/vxdk/releases',
        permanent: true,
      },
    ];
  },
});
