import { useState } from 'react'
import './App.css'

function HomePage(){
  return(
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo para crear un React Router desde cero.</p>
      <a href="/about">Ir a Sobre nosotros.</a>
    </>
  )
}

function AboutPage(){
  return(
    <>
      <h1>About</h1>    
      <div>
        <img src="https://pbs.twimg.com/profile_images/1689487106521862144/43cC8lIo_400x400.jpg" alt="arromero491 profile picture" />
      <p>Hola soy @arromero491 y estoy creando un clon de React Router</p>
      </div>
      <a href="/">Ir a Home.</a>
    </>
  )
}

function App() {

  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  return (
    <main>
      {currentPath === '/' && <HomePage/>}
      {currentPath === '/about' && <AboutPage/>}
    </main>
  )
}

export default App
