import { createClient, type SanityClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '~/sanity/lib/sanity.api';
import "server-only";

// Create the Sanity client
export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: 'published',
  });
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts');
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    });
  }
  return client;
}

// Wrapper function to fetch data with revalidation tags
export async function sanityFetch<QueryResponse>({
  query,
  qParams,
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];  // Ensure tags are passed for revalidation
}): Promise<QueryResponse> {
  const client = getClient();
  return client.fetch<QueryResponse>(query, qParams, {
    cache: "force-cache",  // Cache the result for forced revalidation
    next: { tags },  // Pass tags for revalidation
  });
}
