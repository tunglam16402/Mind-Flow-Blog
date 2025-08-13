const a = /* GraphQL */ `
  products(first: 6) {
      nodes {
                  id
          title
          handle
            description
          images(first: 1) {
             edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          metafield(namespace: "custom", key: "discount_percentage") {
            value
          }
        }
    }
`;

export default a;
