import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
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
    throw error
  }
}