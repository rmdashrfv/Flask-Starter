import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

function App() {
  const [message, setMessage] = useState('Flask has not loaded yet! Check to make sure you ran flask run in the root directory.')
  const [user, setUser] = useState(null)
  
  const submit = async (e) => {
    e.preventDefault()
    let form = new FormData(document.getElementById('signup-form'))
    let req = await fetch('/signup', {
      method: 'POST',
      body: form
    })
    let res = await req.json()
    console.log('Response', res)
  }

  const login = async (e) => {
    e.preventDefault()
    let form = new FormData(document.getElementById('login-form'))
    let req = await fetch('/login', {
      method: 'POST',
      body: form
    })
    let res = await req.json()
    console.log('Response', res)
    if (req.ok && res.user) {
      Cookies.set('auth-token', res.auth_token, {expires: 1})
      setUser(res.user)
    }
  }

  const logout = () => {
    setUser(null)
    Cookies.remove('auth-token')
  }
  
  useEffect(() => {
    const load = async () => {
      try {
	 let req = await fetch('/status')
	 let res = await req.json()
	 if (req.ok) {
           setMessage(res.message)
	 }
       } catch (e) {
         alert('Flask server is not running. Check the console for more information')
	 console.log('ERR', e.message)
       }
    }
    load()
  }, [])

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <h1>Flask + React = ❤️</h1>
      <p>{message}</p>
      <p>Edit the server in <code>app.py</code></p>
      <p>Edit the client in <code>/client/src/App.js</code></p>
      <p>
        {
          user ? `Logged in as ${user.email}` : 'Not logged in'
        }
      </p>
      <form id="signup-form" onSubmit={submit}>
        <input type="text" name="name" /><br />
        <input type="email" name="email" /><br />
	      <input type="password" name="password" /><br />
        <input type="submit" value="Create Account" />
      </form>
      <hr />
      <form id="login-form" onSubmit={login}>
        <input type="email" name="email" /><br />
        <input type="password" name="password" /><br />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default App;
