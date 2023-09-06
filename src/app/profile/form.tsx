'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from '@hooks/useForm'
import { useTimeout } from '@hooks/useTimeout'
import { UpdateUserParams as Values } from 'types/params'
import { User } from 'types/api'
import { validationSchema } from '@validation/schemas/profileSchema'
import { updateUser } from '@api/users/updateUser'
import { Input } from '@styles/globals'
import { Form, FormGroup, FormButton, FormError } from '@styles/form'
import Message from '@components/message/Message'

type Props = {
  user: User
}

const ProfileForm = ({ user }: Props) => {
  const initialValues: Values = {
    name: user.name,
    email: user.email,
    password: '',
  }

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async () => {
    setLoading(true)
    setSuccess(false)
    setError('')

    const response = await updateUser(values)

    if (!response.ok) {
      setLoading(false)
      setError(response.statusText)
      return
    }

    setLoading(false)
    setSuccess(true)
    router.refresh()
  }

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validationSchema,
  })

  useTimeout(
    () => {
      if (success) {
        setSuccess(false)
      }
      if (error) {
        setError('')
      }
    },
    3000,
    [success, error]
  )

  useEffect(() => {
    setError('')
    setSuccess(false)
  }, [errors])
  return (
    <Form onSubmit={handleSubmit} data-testid='profile-form'>
      <h1>User Profile</h1>
      {error && <Message variant='error'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
      <FormGroup>
        <label htmlFor='name'>Name</label>
        <Input
          type='text'
          name='name'
          id='name'
          value={values.name}
          onChange={handleChange}
          autoComplete='on'
          data-testid='name-input'
        />
        {errors.name && (
          <FormError data-testid='name-error'>{errors.name}</FormError>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor='email'>Email</label>
        <Input
          type='email'
          name='email'
          id='email'
          value={values.email}
          onChange={handleChange}
          autoComplete='on'
          data-testid='email-input'
        />
        {errors.email && (
          <FormError data-testid='email-error'>{errors.email}</FormError>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor='password'>Password</label>
        <Input
          type='password'
          name='password'
          id='password'
          value={values.password}
          onChange={handleChange}
          autoComplete='on'
          data-testid='password-input'
        />
        {errors.password && (
          <FormError data-testid='password-error'>{errors.password}</FormError>
        )}
      </FormGroup>
      <FormButton disabled={loading} data-testid='update-button'>
        Update
      </FormButton>
    </Form>
  )
}

export default ProfileForm
