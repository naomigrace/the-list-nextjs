export const getImageUrl = (imageUrl) =>
  imageUrl
    ? `${
        imageUrl.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""
      }${imageUrl}`
    : null;
