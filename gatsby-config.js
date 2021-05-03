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
        bucketName: `starlink-map-website-${process.env.NODE_ENV}`,
        region: 'eu-west-1',
        siteUrl: 'https://dev.starlinkmap.space',
      },
    },
  ],
};
