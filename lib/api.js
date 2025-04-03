import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const PROJECT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  summary
  details {
    json
  }
  date
  authorName
  categoryName
  projectImage {
    url
  }
`;

async function fetchGraphQL(query, variables = {}, preview = false) {
  const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
  const accessToken = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  try {
    console.log("GraphQL Request Body:", JSON.stringify({ query, variables }));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(`HTTP Error: ${response.status}`, result);
      return { data: null, errors: result.errors };
    }

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      return { data: null, errors: result.errors };
    }

    return result;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    return { data: null, errors: [error.message] };
  }
}




export async function getAllProjects(limit = 5) {
  const query = `
    query GetProjects($limit: Int) {
      projectCollection(where: {slug_exists: true}, order: date_DESC, limit: $limit) {
        items {
          sys {
            id
          }
          title
          slug
          summary
          details {
            json
          }
          date
          authorName
          categoryName
          projectImage {
            url
          }
        }
      }
    }`;

  const variables = { limit };

  try {
    const response = await fetchGraphQL(query, variables);

    if (response.errors) {
      console.error("Error fetching projects:", response.errors);
      return [];
    }

    return response?.data?.projectCollection?.items || [];
  } catch (error) {
    console.error("Unexpected error:", error);
    return [];
  }
}





export async function getProject(slug, isDraftMode = false) {
  const query = `
    query GetProject($slug: String!, $preview: Boolean) {
      projectCollection(where: {slug: $slug}, limit: 1, preview: $preview) {
        items {
          ${PROJECT_GRAPHQL_FIELDS}
        }
      }
    }`;

  const variables = { slug, preview: isDraftMode };
  const response = await fetchGraphQL(query, variables);
  return response?.data?.projectCollection?.items[0] || null;
}
