import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUserAction'
import { useState } from 'react'

export function CreateNewUser() {
  const { addUser } = useUserActions()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(null)

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
      return setResult('ko')
    }

    addUser({ name, email, github })
    setResult('ok')
    form.reset()
  }
  return (
    <Card>
      <Title>Create New User</Title>
      <form onSubmit={handleSubmit} className=''>
        <TextInput name='name' placeholder='Enter your name' />
        <TextInput name='email' placeholder='Enter your email' />
        <TextInput name='github' placeholder='Enter your github user' />
        <div>
          <Button
            type='submit'
            style={{ marginTop: '16px' }}
          >
            Crear usuario
          </Button>
          <span>
            {result === 'ok' && <Badge color='green'>Saved successfully</Badge>}
            {result === 'ko' && <Badge color='red'>Error, please check your data!</Badge>}
          </span>
        </div>
      </form>
    </Card>
  )
}