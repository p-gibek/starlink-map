module.exports = {
  siteMetadata: {
    title: 'Starlink Map',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-pnpm',
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'starlink-map-website',
      },
    },
  ],
};
