import { Link } from '../Link.jsx'
export default function AboutPage(){
    return(
      <>
        <h1>About</h1>    
        <div>
          <img src="https://pbs.twimg.com/profile_images/1689487106521862144/43cC8lIo_400x400.jpg" alt="arromero491 profile picture" />
        <p>Hola soy @arromero491 y estoy creando un clon de React Router</p>
        </div>
        <Link to='/'>Ir a Home.</Link>
      </>
    )
  }