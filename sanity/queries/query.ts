import { defineQuery } from "next-sanity";

// Fetch all brands, ordered by name
const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(name asc)`);

// Fetch latest blog marked with isLatest=true, with categories
const LATEST_BLOG_QUERY = defineQuery(
  `*[_type == 'blog' && isLatest == true] | order(publishedAt desc){
    ...,
    blogcategories[]->{
      title
    }
  }`
);

// Fetch all products with status 'hot', include category titles
const DEAL_PRODUCTS = defineQuery(
  `*[_type == 'product' && status == 'hot'] | order(name asc){
    ...,
    "categories": categories[]->title
  }`
);

// Fetch single product by slug
const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
);

// Fetch brand name for a product by slug
const BRAND_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug]{ 
    "brandName": brand->title
  }`
);

// Fetch orders for a specific user, ordered by orderDate descending
const MY_ORDERS_QUERY = defineQuery(
  `*[_type == 'order' && clerkUserId == $userId] | order(orderDate desc){
    ...,
    products[]{
      ...,
      product->
    }
  }`
);

// Fetch all blogs with a limit ($quantity), ordered by published date
const GET_ALL_BLOG = defineQuery(
  `*[_type == 'blog'] | order(publishedAt desc)[0...$quantity]{
    ...,
    blogcategories[]->{
      title
    }
  }`
);

// Fetch a single blog by slug with author info and categories
const SINGLE_BLOG_QUERY = defineQuery(
  `*[_type == "blog" && slug.current == $slug][0]{
    ...,
    author->{
      name,
      image
    },
    blogcategories[]->{
      title,
      "slug": slug.current
    }
  }`
);

// Fetch all blog categories
const BLOG_CATEGORIES = defineQuery(
  `*[_type == "blog"]{
    blogcategories[]->{
      ...
    }
  }`
);

// Fetch other blogs excluding a specific slug, limited by $quantity
const OTHERS_BLOG_QUERY = defineQuery(
  `*[
    _type == "blog" &&
    defined(slug.current) &&
    slug.current != $slug
  ] | order(publishedAt desc)[0...$quantity]{
    ...,
    publishedAt,
    title,
    mainImage,
    slug,
    author->{
      name,
      image
    },
    categories[]->{
      title,
      "slug": slug.current
    }
  }`
);

export {
  BRANDS_QUERY,
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  MY_ORDERS_QUERY,
  GET_ALL_BLOG,
  SINGLE_BLOG_QUERY,
  BLOG_CATEGORIES,
  OTHERS_BLOG_QUERY,
};
