import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Re-enabled CDN - data is fetching correctly
})

export const safeClientFetch = async <T = any>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> => {
  try {
    const data = await client.fetch<T>(query, params || {})
    return data
  } catch (error) {
    console.error('Sanity fetch error:', error)
    // Return empty array as default to allow build to continue
    return [] as unknown as T
  }
}