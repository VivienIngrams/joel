import type { PortableTextBlock } from '@portabletext/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'


// GROQ query to fetch posts by section
const postsBySectionQuery = (section: string) => groq`
  *[_type == "post" && section == $section] {
    _id,
    _createdAt,
    title,
    title_en,
    slug,
   
    excerpt,
    excerpt_en,
    subtitles,
    mainImages,
    layout
  } | order(_createdAt desc)
`

// Generic function to fetch posts by section
export async function getPosts(
  client: SanityClient,
  section: 'gallery' | 'projets-actuels' | 'collaborations', // Limit to valid sections
  language: 'en' | 'fr' | string = 'fr',
  options = {}
): Promise<Post[]> {
  try {
    // Fetch posts for the given section
    const posts = await client.fetch(postsBySectionQuery(section), {
      section, // Pass the section parameter here
      ...options, // Spread other options if any
    })

    // Map through the posts and localize the content
    const languagePosts = posts.map((post) => ({
      ...post,
      title: language === 'en' ? post.title_en || post.title : post.title,
      excerpt: language === 'en' ? post.excerpt_en || post.excerpt : post.excerpt,
    }))

    return languagePosts
  } catch (error) {
    console.error('Error fetching posts by section:', error)
    throw error
  }
}
// Query to fetch a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    title_en,
    slug,
    section,
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
  mainImages: any[] 
  title: string
  title_en?: string
  subtitles?: string[]
  excerpt?: PortableTextBlock[]
  excerpt_en?: PortableTextBlock[]
  section?: 'gallery' | 'projets-actuels' | 'collaborations'
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

export type Video = {
title: string
youtubeUrl: string
}

// GROQ query to fetch videos
const videosQuery = groq`
  *[_type == "videoPage"][0] {
  title,
  videos[] {
    title,
    youtubeUrl
  }
}`

  // Function to fetch videos
export async function getVideos(
  client: SanityClient,
  options = {}
): Promise<Video[]> {
  try {
    // Fetch videos
    const videos = await client.fetch(videosQuery, options)

    return videos
  } catch (error) {
    console.error('Error fetching videos:', error)
    throw error
  }
}