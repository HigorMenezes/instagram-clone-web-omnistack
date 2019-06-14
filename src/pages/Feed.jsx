import React, { useState, useEffect } from 'react'
import './Feed.css'
import io from 'socket.io-client'
import more from '../assets/more.svg'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'

import api from '../services/api'

const socket = io('http://localhost:3333')

const Feed = () => {
  const [feed, setFeed] = useState([])

  const handleLike = id => {
    api.post(`posts/${id}/like`)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('posts')
      setFeed(response.data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    socket.on('post', newPost => {
      setFeed([newPost, ...feed])
    })

    socket.on('like', likedPost => {
      for (let i = 0; i < feed.length; i++) {
        if (likedPost._id === feed[i]._id) {
          feed[i] = likedPost
          setFeed(feed)
          break
        }
      }

      setFeed(feed.map(post => (post._id === likedPost._id ? likedPost : post)))
    })
  }, [feed])

  return (
    <section id='post-list'>
      {feed.map(post => (
        <article key={post._id}>
          <header>
            <div className='user-info'>
              <span>{post.author}</span>
              <span className='place'>Rio do Sul</span>
            </div>
            <img src={more} alt='' />
          </header>
          <img src={`http://localhost:3333/files/${post.image}`} alt='' />
          <footer>
            <div className='actions'>
              <button type='button' onClick={() => handleLike(post._id)}>
                <img src={like} alt='' />
              </button>
              <img src={comment} alt='' />
              <img src={send} alt='' />
            </div>
            <strong>{post.likes}</strong>
            <p>
              {post.description}
              <span>{post.hashtags}</span>
            </p>
          </footer>
        </article>
      ))}
    </section>
  )
}

export default Feed
