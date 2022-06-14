import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('Flask has not loaded yet! Check to make sure you ran flask run in the root directory.')
  
  useEffect(() => {
    const load = async () => {
    try {
      let req = await fetch('/')
      let res = await req.json()
      console.log('Res', res)
      if (req.ok) {
	setMessage(res.message)
      }
    } catch (e) {
      // alert(e.message)
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
    </div>
  );
}

export default App;
