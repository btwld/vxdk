
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import CustomSearch from './components/Search';

const description = 'Vxdk: Video Experience Development Kit';

const Logo = (
  <>
    <span className="mr-2 font-extrabold hidden md:inline">VXDK</span>
    <span className="text-gray-600 font-normal hidden md:inline">
      Video Experience Dev Kit
    </span>
  </>
);

const themeConfig = {
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – Vxdk',
      };
    }
  },
  logo: Logo,
  project: {
    link: 'https://github.com/btwld/vxdk',
  },
  docsRepositoryBase: 'https://github.com/btwld/vxdk/blob/main/docs',
  search: {
    component: <CustomSearch />,
  },
  head: () => {
    const { title, frontMatter } = useConfig();
    const { route } = useRouter();
    const socialCard =
      route === '/' || !title
        ? './share-image.png'
        : `https://vxdk.dev/api/og?title=${title}`;

    return (
      <>
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={frontMatter.description || description}
        />
        <meta
          name="og:description"
          content={frontMatter.description || description}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialCard} />
        <meta name="twitter:site:domain" content="vxdk.dev" />
        <meta name="twitter:url" content="https://vxdk.dev" />
        <meta name="og:title" content={title ? title : 'Vxdk'} />
        <meta name="og:image" content={socialCard} />
        <meta name="apple-mobile-web-app-title" content="Vxdk" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      </>
    );
  },
  navigation: {
    prev: true,
    next: true,
  },
  toc: {
    float: true,
    backToTop: true,
  },
  darkMode: false,
  nextThemes: {
    defaultTheme: "dark",
    forcedTheme: "dark",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: false,
    toggleButton: false,
  },
  editLink: {
    text: 'Edit this page on GitHub',
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <p className="mt-6 text-xs">© {new Date().getFullYear()} BitWild.</p>
      </div>
    ),
  },
};

export default themeConfig;
