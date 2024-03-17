export interface Comment {
  title: string
  message: string
  preview?: boolean
}

export interface CommentWithId extends Comment {
  id: string
}

// ApiKey could be public as service is 100% free
const apiKey = '$2a$10$oKFn4V1Fcr5Koy4IV65L0uyTD1hbX81z6qdzmU3NizKTVwvg8edQi'

export const getComments = async () => {
  const response = await fetch('https://api.jsonbin.io/v3/b/65f6ab5f266cfc3fde999963', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': apiKey
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch comments.')
  }

  const json = await response.json()

  return json?.record
}

const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

export const postComment = async (comment: Comment) => {
  const comments = await getComments()

  const id = crypto.randomUUID()
  const newComment = { ...comment, id }
  const commentsToSave = [...comments, newComment]

  const response =await fetch('https://api.jsonbin.io/v3/b/65f6ab5f266cfc3fde999963', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': apiKey
    },
    body: JSON.stringify(commentsToSave)
  })

  if (!response.ok) {
    throw new Error('Failed to post comment.')
  }

  return newComment
}
