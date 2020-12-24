import { fetchAPI, fetchPublicAPI } from "./fetchers";

export async function loginUser(user, pass) {
  const data = fetchPublicAPI(
    `
    mutation LoginUser($input: UsersPermissionsLoginInput!) {
      login(input: $input) {
        jwt
        user {
          email
        }
      }
    }    
  `,
    {
      variables: {
        input: {
          identifier: user,
          password: pass,
        },
      },
    }
  );
  return data;
}

export async function getHomepageImages(jwt) {
  const data = fetchAPI(
    jwt,
    `
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
      vacations {
        formats
      }
    }
  }  
  `
  );
  return data;
}

export async function getAllMarkers(jwt) {
  const data = fetchAPI(
    jwt,
    `
  {
    actions {
      geojson
    }
  }`
  );
  return data;
}

export async function getAllActions(jwt) {
  console.log("WHAT IS THE TOKEN", jwt);
  const data = fetchAPI(
    jwt,
    `
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
  }`
  );
  return data;
}

export async function getAllActionsWithSlug(jwt) {
  const data = fetchAPI(
    jwt,
    `
    {
      actions {
        slug
      }
    }
  `
  );
  return data;
}

export async function getActionBySlug(jwt, slug) {
  const data = await fetchAPI(
    jwt,
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

export async function getAllCategoryTitles(jwt) {
  const data = fetchAPI(
    jwt,
    `
  {
    categories {
      title
      slug
      cover {
        url
      }
    }
  }`
  );
  return data;
}

export async function getAllVacationTitles(jwt) {
  const data = fetchAPI(
    jwt,
    `
  {
    vacations {
      title
      slug
      cover {
        url
      }
    }
  }`
  );
  return data;
}

export async function getAllNeighborhoodNames(jwt) {
  const data = fetchAPI(
    jwt,
    `
  {
    neighborhoods {
      name
      slug
    }
  }`
  );
  return data;
}

export async function getActionsByCategory(jwt, category, preview) {
  const data = await fetchAPI(
    jwt,
    `
  query ActionsByCategory($where: JSON) {
    actions(where: $where) {
      title
      slug
      description
      date
      location
      completed
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

export async function getActionsByNeighborhood(jwt, neighborhood, preview) {
  const data = await fetchAPI(
    jwt,
    `
  query ActionsByNeighborhood($where: JSON) {
    actions(where: $where) {
      title
      slug
      description
      date
      location
      completed
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

export async function getActionAndMoreActions(jwt, slug, preview) {
  const data = await fetchAPI(
    jwt,
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

export async function getVacationAndMoreVacations(jwt, slug, preview) {
  const data = await fetchAPI(
    jwt,
    `
  query VacationsBySlug($where: JSON, $where_ne: JSON) {
    vacations(where: $where) {
      title
      slug
      description
      start
      end
      location
      ogImage: cover{
        url
      }
      cover {
        url
      }
    }

    moreVacations: vacations(sort: "title:desc", limit: 2, where: $where_ne) {
      title
      slug
      start
      end
      location
      ogImage: cover{
        url
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
