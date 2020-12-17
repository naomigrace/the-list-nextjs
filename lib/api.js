async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getHomepageImages() {
  const data = fetchAPI(`
  {
    homepage {
      category {
        formats
      }
      neighborhood {
        formats
      }
      map {
        formats
      }
    }
  }  
  `);
  return data;
}

export async function getAllActions() {
  const data = fetchAPI(`
  {
    actions {
      id
      title
      description
      location
      date
      cover {
        url
      }
      slug
      neighborhood {
        name
      }
      categories {
        title
      }
      completed
    }
  }`);
  return data;
}

export async function getAllActionsWithSlug() {
  const data = fetchAPI(`
    {
      actions {
        slug
      }
    }
  `);
  return data;
}

export async function getActionBySlug(slug) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON) {
    actions(where: $where) {
      slug
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  );
  return data?.actions[0];
}

export async function getAllCategoryTitles() {
  const data = fetchAPI(`
  {
    categories {
      title
      slug
      cover {
        url
      }
    }
  }`);
  return data;
}

export async function getAllNeighborhoodNames() {
  const data = fetchAPI(`
  {
    neighborhoods {
      name
      slug
    }
  }`);
  return data;
}

export async function getActionsByCategory(category, preview) {
  const data = await fetchAPI(
    `
  query ActionsByCategory($where: JSON) {
    actions(where: $where) {
      title
      slug
      description
      date
      location
      ogImage: cover{
        url
      }
      categories {
        title
      }
      neighborhood {
        name
      }
      cover {
        url
      }
    }

  }
  `,
    {
      preview,
      variables: {
        where: {
          categories: {
            slug: category,
          },
          ...(preview ? {} : {}),
        },
      },
    }
  );
  return data;
}

export async function getActionsByNeighborhood(neighborhood, preview) {
  const data = await fetchAPI(
    `
  query ActionsByNeighborhood($where: JSON) {
    actions(where: $where) {
      title
      slug
      description
      date
      location
      ogImage: cover{
        url
      }
      categories {
        title
      }
      neighborhood {
        name
      }
      cover {
        url
      }
    }

  }
  `,
    {
      preview,
      variables: {
        where: {
          neighborhood: {
            slug: neighborhood,
          },
          ...(preview ? {} : {}),
        },
      },
    }
  );
  return data;
}

export async function getActionAndMoreActions(slug, preview) {
  const data = await fetchAPI(
    `
  query ActionsBySlug($where: JSON, $where_ne: JSON) {
    actions(where: $where) {
      title
      slug
      description
      date
      location
      ogImage: cover{
        url
      }
      categories {
        title
      }
      neighborhood {
        name
      }
      cover {
        url
      }
    }

    moreActions: actions(sort: "date:desc", limit: 2, where: $where_ne) {
      title
      slug
      location
      date
      neighborhood {
        name
      }
      cover {
        url
      }
    }
  }
  `,
    {
      preview,
      variables: {
        where: {
          slug,
          ...(preview ? {} : {}),
        },
        where_ne: {
          ...(preview ? {} : {}),
          slug_ne: slug,
        },
      },
    }
  );
  return data;
}
