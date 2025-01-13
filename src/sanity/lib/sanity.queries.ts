import type { PortableTextBlock } from '@portabletext/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

// Query to fetch all posts with defined slugs, ordered by creation date
export const postsQuery = groq`
  *[_type == "post" && slug.current in ["survol", "hors-d-age", "respiration", "images-du-jour", "autoportraits", "derision", "collaborations", "projets"]] {
    title,
    title_en,
    slug,
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
export const collaborationsPostsQuery = groq`
  *[_type == "post" && slug.current in ["mathilde", "johanna", "vibrations" ]] {
    _id,
    _createdAt,
     title,
    title_en,
    slug,
    excerpt,
    excerpt_en,
    mainImages, 
    layout,
  } 
`
export async function getCollaborationsPosts(
  client: SanityClient,
  options = {},
): Promise<Post[]> {
  const posts = await client.fetch(collaborationsPostsQuery, options)
  return posts
}
export const projetsPostsQuery = groq`
  *[_type == "post" && slug.current in ["dante-extraits", "memento"]] {
    _id,
    _createdAt,
    title,
    title_en,
    slug,
    excerpt,
    excerpt_en,
     subtitles,
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
    title_en,
    slug,
    excerpt,
    excerpt_en,
    subtitles,
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
  const post = await client.fetch(postBySlugQuery, { slug }, options)

  return post
}

// Query to fetch all slugs for posts
export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export type Post = {
  _type: 'post'
  _id: string
  slug: { current: string }
  _createdAt: string
  mainImages: any[] // Ensure this is required if you always expect it
  title: string
  title_en?: string
  subtitles?: string[]
  excerpt?: PortableTextBlock[]
  excerpt_en?: PortableTextBlock[]
  layout: 'portrait' | 'square' | 'landscape'
  images?: any[]
}

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
      title,
    title_en,
    slug,
    excerpt,
    excerpt_en,
    images[]{
      ...,
      "aspectRatio": asset->metadata.dimensions.aspectRatio
    }
  } 
`
