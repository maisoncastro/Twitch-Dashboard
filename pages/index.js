// Main entry point of your app
import React, { useState } from "react"
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home = () => {
  // State
  const [favoriteChannels, setFavoriteChannels] = useState([])


  // Action
  const addStream = async event => {
    // Prevents page from redirecting
    event.preventDefault()

    const { value } = event.target.elements.name

    if (value) {
      console.log('Input: ', value)

      // Call Twitch Stream API
      const path = `https//${window.location.hostname}`
      
      const response = await fetch(`${path}/api/twitch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: value })
      })

      const json = await response.json()

      console.log("From the server: ", json.data)

      setFavoriteChannels(prevState => [...prevState, value])

      event.target.elements.name.value = ""
    }
  }

  // Render Form
  const renderForm = () => (
    <div className={styles.formContainer}>
      <form onSubmit={addStream}>
       <input id="name" placeholder="Twitch Channel Name" type="text" required />
       <button type="submit">+</button>
      </form>
    </div>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Twitch Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.inputContainer}>
        {renderForm()}
        <div>{favoriteChannels.join(", ")}</div>
      </div>
    </div>
  )
}

export default Home