import { test } from '@japa/runner'

test('/status', async ({ client }) => {
  const response = await client.get('/status')

  response.assertStatus(200)
})
