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
    excerpt,
    excerpt_en
  } | order(
    _createdAt desc
  )
`

// Function to fetch all posts
export async function getPosts(
  client: SanityClient,
  language: string | 'en' | 'fr' = 'fr', // default language is 'fr'
  options = {}
): Promise<Post[]> {
  // Construct the query based on the selected language
  const posts = await client.fetch(postsQuery, options)

  // Map through the posts and return the correct language-based title and excerpt
  const languagePosts = posts.map((post) => ({
    ...post,
    title: language === 'en' ? post.title_en || post.title : post.title,
    excerpt: language === 'en' ? post.excerpt_en || post.excerpt : post.excerpt,
  }))

  return languagePosts
}

export const collaborationsPostsQuery = groq`
  *[_type == "post" && slug.current in ["mathilde", "johanna", "vibrations"]] {
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
  language: string | 'en' | 'fr' = 'fr',
  options = {}
): Promise<Post[]> {
  const posts = await client.fetch(collaborationsPostsQuery, options)

  // Map through the posts and return the correct language-based title and excerpt
  const languagePosts = posts.map((post) => ({
    ...post,
    title: language === 'en' ? post.title_en || post.title : post.title,
    excerpt: language === 'en' ? post.excerpt_en || post.excerpt : post.excerpt,
  }))

  return languagePosts
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
  language: string | 'en' | 'fr' = 'fr',
  options = {}
): Promise<Post[]> {
  const posts = await client.fetch(projetsPostsQuery, options)

  // Map through the posts and return the correct language-based title and excerpt
  const languagePosts = posts.map((post) => ({
    ...post,
    title: language === 'en' ? post.title_en || post.title : post.title,
    excerpt: language === 'en' ? post.excerpt_en || post.excerpt : post.excerpt,
  }))

  return languagePosts
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
    images[] {
      ...,
      "aspectRatio": asset->metadata.dimensions.aspectRatio
    }
  }
`

// Function to fetch a post by its slug
export async function getPost(
  client: SanityClient,
  slug: string,
  language: string | 'en' | 'fr' = 'fr', // default language is 'fr'
  options = {}
): Promise<Post> {
  const post = await client.fetch(postBySlugQuery, { slug }, options)

  // Return the correct language-based title and excerpt
  return {
    ...post,
    title: language === 'en' ? post.title_en || post.title : post.title,
    excerpt: language === 'en' ? post.excerpt_en || post.excerpt : post.excerpt,
  }
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

export const bioQuery = groq`*[_type == "bioContent"]{
  _id,
  _type,
  "imageUrl": image.asset->url,
  biography {
    fr {
      biographyText[]{
        ... 
      },
      artisticTraining,
      organizer,
      exhibitions
    },
    en {
      biographyText[]{
        ... 
      },
      artisticTraining,
      organizer,
      exhibitions
    }
  }
}
`

export async function getBioPage(client: SanityClient, options = {}) {
  const bioPage = await client.fetch(bioQuery, options)
  return bioPage
}
