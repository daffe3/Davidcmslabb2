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
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
  date
  authorName
  categoryName
  projectImage {
    url
  }
`;

async function fetchGraphQL(query, variables = {}, preview = false) {
  console.log("🔍 Fetching from Contentful...");

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query, variables }),
      next: { tags: ["projects"] },
    }
  );

  const result = await response.json();
 
  console.log("📦 Contentful Response:", JSON.stringify(result, null, 2));

  if (result.errors) {
    console.error("❌ Contentful GraphQL Error:", result.errors);
    throw new Error("Failed to fetch data from Contentful");
  }

  return result;
}

function extractProjectEntries(fetchResponse) {
  if (!fetchResponse?.data?.projectCollection) {
    console.error("⚠️ No data returned from Contentful", fetchResponse);
    return [];
  }
  return fetchResponse.data.projectCollection.items;
}
export async function getAllProjects(limit = 5, isDraftMode = false) {
  const query = `
    query GetProjects($limit: Int, $preview: Boolean) {
      projectCollection(where: {slug_exists: true}, order: date_DESC, limit: $limit, preview: $preview) {
        items {
          ${PROJECT_GRAPHQL_FIELDS}
        }
      }
    }`;

  const variables = { limit, preview: isDraftMode };

  const projects = await fetchGraphQL(query, variables, isDraftMode);
  return extractProjectEntries(projects);
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

  const project = await fetchGraphQL(query, variables, isDraftMode);
  return extractProjectEntries(project)[0]; 
}
