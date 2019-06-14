import React, { useState } from 'react'
import './New.css'
import api from '../services/api'

const New = props => {
  const [input, setInput] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    const data = new FormData()

    data.append('image', input.image)
    data.append('author', input.author)
    data.append('place', input.place)
    data.append('description', input.description)
    data.append('hashtags', input.hashtags)

    await api.post('/posts', data)

    props.history.push('/')
  }

  const handleImageChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.files[0],
    })
  }

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form id='new-post' onSubmit={handleSubmit}>
      <input name='image' type='file' onChange={handleImageChange} />
      <input
        type='text'
        name='author'
        placeholder='Autor do post'
        onChange={handleChange}
        value={input.author || ''}
      />
      <input
        type='text'
        name='place'
        placeholder='Local do post'
        onChange={handleChange}
        value={input.place || ''}
      />
      <input
        type='text'
        name='description'
        placeholder='Descroção do post'
        onChange={handleChange}
        value={input.description || ''}
      />
      <input
        type='text'
        name='hashtags'
        placeholder='Hashtags do post'
        onChange={handleChange}
        value={input.hashtags || ''}
      />
      <button type='submit'>Enviar</button>
    </form>
  )
}

export default New
