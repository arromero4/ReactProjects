import { EVENTS } from './consts'
import { useEffect, useState } from 'react'
import { match } from 'path-to-regexp'

export function Router({ routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
  
    useEffect(() => {
      const onLocationChange = () => {
        setCurrentPath(window.location.pathname)
      }
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
  
      return () => {
        window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
  
      }
    }, [])
    
    let routeParams = {}
    const Page = routes.find(({ path }) => {
    if(path === currentPath) return true

    //hemos usado path-to-regex
    //para detectar rutas dinamicas como por ejemplo
    // search/:query
    const matcherURL = match(path, { decode: decodeURIComponent})
    const matched = matcherURL(currentPath)
    if(!matched) return false
    
    //guardar los parametros de la url que eran dinamicos
    // y que hemos extraido con path-to-regex
    // por ejemplo: si la ruta es: /search/:query
    // y la url es /seach/javascript
    // matched.params.query == 'javascript'
    routeParams = matched.params // { query: 'javascript'} // search/javascript
    return true
    
    })?.Component

    return Page ? 
    <Page routeParams={routeParams} /> 
    : <DefaultComponent routeParams={routeParams}/>
  }