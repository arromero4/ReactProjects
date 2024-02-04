import { useEffect, useState } from 'react'
import './App.css'

const FollowMouse = () => {
  
const [enabled, setEnabled] = useState(false)
const [position, setPosition] = useState({ x: 0, y: 0 })

//pointer move
  useEffect(() => {
    console.log('efect', { enabled})
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x:clientX, y:clientY })
    }
    if(enabled){ 
      window.addEventListener('pointermove', handleMove)
    }
    //clean up
    // cuando el componente se desmonta
    // cuando cambian las dependencias, antes de ejecutar
    // el efecto de nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

//[] -> solo se ejecuta una vez cuando se monta el componente
//[dependencia] -> se ejecuta cuando cambia la dependencia y cuando se monta el componente
// undefined -> se ejecuta cada vez que se renderiza el componente

//change body classname
useEffect(() => {
 document.body.classList.toggle('no-cursor', enabled)
 return () => {
  document.body.classList.remove('no-cursor')
 }
},[enabled])
  return (
    <>
    <div style={{
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid #fff',
      borderRadius: '50%',
      opacity: 0.8,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
      transform: `translate(${position.x}px, ${position.y}px)`,
    }}/>
    <button onClick={()=> setEnabled(!enabled) }>
      {enabled ? 'Desactivar' : 'Activar'} seguir puntero</button>
    </>
  )
}

function App() {

  return (
    <main>
      <FollowMouse />

    </main>
  )
}

export default App
