import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';
import { type SanityClient } from 'next-sanity';

// Query to fetch all posts with defined slugs, ordered by creation date
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;

// Function to fetch all posts
export async function getPosts(client: SanityClient, options = {}): Promise<Post[]> {
  return await client.fetch(postsQuery, options);
}

// Query to fetch a single post by slug
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`;

// Function to fetch a post by its slug
export async function getPost(client: SanityClient, slug: string): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  });
}

// Query to fetch all slugs for posts
export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

// Updated Post interface to include the new mainImages field
export interface Post {
  _type: 'post';
  _id: string;
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImages?: ImageAsset[]; // Changed from mainImage to mainImages to accommodate the array
  body: PortableTextBlock[];
}
