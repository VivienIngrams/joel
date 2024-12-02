import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

// Query to fetch all posts with defined slugs, ordered by creation date
export const postsQuery = groq`
  *[_type == "post" && slug.current in ["survol", "hors-d-age", "respiration", "respiration2", "autoportraits", "moi-vu-par-elles-eux", "derision", "publiees", "projets"]] {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    mainImages, 
    layout,
  } | order(
    _createdAt desc
  )
`

// Function to fetch all posts
export async function getPosts(
  client: SanityClient,
  options = {},
): Promise<Post[]> {
  const posts = await client.fetch(postsQuery, options)

  return posts
}
export const publieesPostsQuery = groq`
  *[_type == "post" && slug.current in ["mathilde", "johanna", "delphine"]] {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    mainImages, 
    layout,
  } | order(_createdAt desc)
`
export async function getPublieesPosts(
  client: SanityClient,
  options = {},
): Promise<Post[]> {
  const posts = await client.fetch(publieesPostsQuery, options)
  return posts
}
export const projetsPostsQuery = groq`
  *[_type == "post" && slug.current in ["dante-extraits", "vibrations", "memento"]] {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    mainImages, 
    layout,
  } | order(_createdAt desc)
`

export async function getProjetsPosts(
  client: SanityClient,
  options = {},
): Promise<Post[]> {
  const posts = await client.fetch(projetsPostsQuery, options)

  return posts
}

// Query to fetch a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    excerpt,
    slug,
    images[]{
      ...,
      "aspectRatio": asset->metadata.dimensions.aspectRatio
    }
  }
`

// Function to fetch a post by its slug
export async function getPost(
  client: SanityClient,
  slug: string,
  options = {},
): Promise<Post> {
  const post = await client.fetch(postBySlugQuery, { slug })

  return post
}

// Query to fetch all slugs for posts
export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export type Post = {
    _type: 'post'
  _id: string;
  slug: { current: string; };
  _createdAt: string
  mainImages: any[]; // Ensure this is required if you always expect it
  title: string;
  excerpt?: PortableTextBlock[];
  layout: 'portrait' | 'square' | 'landscape';
  images?: any[];
};

// Query to fetch the home page data
export const homePageQuery = groq`
  *[_type == "home"][0] {
    mainImages[] 
  }
`

// Function to fetch the home page data
export async function getHomePage(client: SanityClient, options = {}) {
  const homePage = await client.fetch(homePageQuery, options)
  return homePage
}


// Function to fetch the home page data
export async function getDelphinePage(client: SanityClient, options = {}) {
  const delphinePage = await client.fetch(delphineQuery, options)
  return delphinePage
}
// Query to fetch the home page data
export const delphineQuery = groq`
 *[_type == "post" && slug.current in ["delphine"]][0] {
    _id,
    title,
    slug,
    excerpt,
    images[]{
      ...,
      "aspectRatio": asset->metadata.dimensions.aspectRatio
    }
  } 
`
