import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

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
    console.error("Error fetching GraphQL data:", error.message);
    return { data: null, errors: [error.message] };
  }
}

export async function getAllProjects(limit = 5, categoryFilter = null) {
  const query = `
    query GetProjects($limit: Int) {
      projectCollection(
        limit: $limit,
        order: titel_DESC
      ) {
        items {
          sys { id }
          titel
          slug
          category {
            ... on Category {
              name
            }
          }
          image {
            url
          }
        }
      }
    }
  `;

  const variables = { limit };

  try {
    const response = await fetchGraphQL(query, variables);

    if (response.errors) {
      console.error("Error fetching projects:", response.errors);
      return [];
    }

    let projects = response?.data?.projectCollection?.items || [];

    if (categoryFilter) {
      projects = projects.filter(project => project.category?.name === categoryFilter);
    }

    return projects;
  } catch (error) {
    console.error("Unexpected error:", error);
    return [];
  }
}

export async function getProject(slug, isDraftMode = false) {
  const query = `
    query GetProjectBySlug($slug: String!) {
  projectCollection(where: {slug: $slug}) {
    items {
      sys {
        id
      }
      titel
      slug
      shortDescription
      image {
        url
        description
      }
      category {
        ... on Category {
          name
        }
      }
    }
  }
}
  `;

  const variables = { slug, preview: isDraftMode };

  try {
    const response = await fetchGraphQL(query, variables);

    if (!response?.data?.projectCollection?.items[0]) {
      throw new Error("Project not found.");
    }

    return response?.data?.projectCollection?.items[0];
  } catch (error) {
    console.error("Error fetching project data:", error.message);
    return null;
  }
}

export async function getHomepageData() {
  const query = `
    query {
      homepageCollection(limit: 1) {
        items {
          sys { id }
          title
          presentationText
          image {
            url
            description
          }
        }
      }
    }`;

  try {
    const response = await fetchGraphQL(query);
    return response?.data?.homepageCollection?.items[0] || null;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}

export async function getCategories() {
  const query = `
    query {
      categoryCollection {
        items {
          name
        }
      }
    }`;

  try {
    const response = await fetchGraphQL(query);
    return response?.data?.categoryCollection?.items || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getContactData() {
  const query = `
    query {
      contactCollection(limit: 1) {
        items {
          sys { id }
          title
          description
          phone
          image {
            url
          }
        }
      }
    }`;

  try {
    const response = await fetchGraphQL(query);
    return response?.data?.contactCollection?.items[0] || null;
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return null;
  }
}

export async function getAboutMeData() {
  const query = `
    query {
      aboutMeCollection(limit: 1) {
        items {
          sys { id }
          bio
          education
          experience
          slug
        }
      }
    }`;

  try {
    const response = await fetchGraphQL(query);
    return response?.data?.aboutMeCollection?.items[0] || null;
  } catch (error) {
    console.error("Error fetching about me data:", error);
    return null;
  }
}
