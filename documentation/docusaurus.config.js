/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'React-Jitsi-Hooks',
  tagline: 'Jitsi Low Level API, easy mode',
  url: 'https://collabdesign.org/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',
  organizationName: 'collabdesign', // Usually your GitHub org/user name.
  projectName: 'react-jitsi-hooks', // Usually your repo name.

  ssrTemplate: `<!DOCTYPE html>
  <html <%~ it.htmlAttributes %>>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=3.0, minimum-scale=0.86">
      <meta name="generator" content="Docusaurus v<%= it.version %>">
      <%~ it.headTags %>
      <% it.metaAttributes.forEach((metaAttribute) => { %>
        <%~ metaAttribute %>
      <% }); %>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/site.webmanifest">
      <meta name="msapplication-TileColor" content="#ffffff">
      <meta name="theme-color" content="#ffffff">
      <link type="text/plain" rel="author" href="/humans.txt" />
      <% it.stylesheets.forEach((stylesheet) => { %>
        <link rel="stylesheet" type="text/css" href="<%= it.baseUrl %><%= stylesheet %>" />
      <% }); %>
      <% it.scripts.forEach((script) => { %>
        <link rel="preload" href="<%= it.baseUrl %><%= script %>" as="script">
      <% }); %>
    </head>
    <body <%~ it.bodyAttributes %> itemscope="" itemtype="http://schema.org/Organization">
      <%~ it.preBodyTags %>
      <div id="__docusaurus">
        <%~ it.appHtml %>
      </div>
      <div id="outside-docusaurus">
        <span>Custom markup</span>
      </div>
      <% it.scripts.forEach((script) => { %>
        <script type="text/javascript" src="<%= it.baseUrl %><%= script %>"></script>
      <% }); %>
      <%~ it.postBodyTags %>
    </body>
  </html>
  };
  `,
  themeConfig: {
    navbar: {
      title: 'React-Jitsi-Hooks',
      logo: {
        alt: 'React Jitsi Hooks Logo',
        src: 'https://collabdesign.org/wp-content/uploads/CollabDesign.png',
      },
      items: [
        {
          to: 'docs/api',
          activeBasePath: 'docs/api',
          label: 'API Reference',
          position: 'left',
        },
        {
          to: 'docs/guides/',
          activeBasePath: 'docs/guides',
          label: 'Getting Started',
          position: 'left',
        },

        {
          href: 'https://github.com/collabdesign/react-jitsi-hooks',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'API Reference',
              to: 'docs/api',
            },
            {
              label: 'Getting Started guides',
              to: 'docs/guides',
            },
          ],
        },
        {
          title: 'Partners',
          items: [
            {
              label: 'Collab Design',
              to: 'https://collabdesign.org/',
            },
            {
              label: 'Facilita',
              to: 'https://facilita.social/',
            },
            {
              label: 'Tandem Digital Lab',
              href: 'https://digital-lab.pt',
            },
          ],
        },
        {
          title: 'Work with "us"',
          items: [
            {
              label: 'Receive support for your project',
              to: '/docs/work-with-us/',
            },
            {
              label: 'How to contribute?',
              to:
                'https://github.com/collabdesign/react-jitsi-hooks/blob/master/CONTRIBUTE',
            },
            {
              label: 'Donation',
              href:
                'https://collabdesign.org/?asp_action=show_pp&product_id=307',
            },
          ],
        },
      ],
      copyright: `⚡️ CollabDesign. License: MIT`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
