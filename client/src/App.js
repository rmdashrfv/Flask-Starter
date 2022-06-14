import React, { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('Flask has not loaded yet! Check to make sure you ran flask run in the root directory.')
  
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
      <form id="signup-form" onSubmit={submit}>
        <input type="email" name="email" /><br />
	<input type="password" name="password" /><br />
        <input type="submit" value="Create Account" />
      </form>
    </div>
  );
}

export default App;
