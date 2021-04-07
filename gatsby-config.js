module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Project-12e: Virtual Lolly `,
    author: `@Ashraf`,
  },
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     // Arbitrary name for the remote schema Query type
    //     typeName: "lolly",
    //     // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
    //     fieldName: "vCards",
    //     // Url to query from
    //      url: `https://new-lolly-ashraf.netlify.app/.netlify/functions/vCard`,
    //     // url: `http://localhost:8888/.netlify/functions/vLolly`,
    //   },
    // }
  ],
}
