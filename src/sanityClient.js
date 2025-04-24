import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'cllkc8o2', // заміни на свій
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
})
