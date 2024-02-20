import { EVENTS } from './consts'
import { Children, useEffect, useState } from 'react'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils'

export function Router({children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
    const [currentPath, setCurrentPath] = useState(getCurrentPath())
  
    useEffect(() => {
      const onLocationChange = () => {
        setCurrentPath(getCurrentPath())
      }
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
  
      return () => {
        window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
  
      }
    }, [])
    
    let routeParams = {}

    //añadir las rutas que vienen del children de <Route/>
    const routesFromChildren = Children.map(children, ({ props, type }) => {
      const { name } = type
      const isRoute = name === 'Route'
      return isRoute ? props : null
    })

    const routesToUse = routes.concat(routesFromChildren).filter(Boolean)
    

    const Page = routesToUse.find(({ path }) => {
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