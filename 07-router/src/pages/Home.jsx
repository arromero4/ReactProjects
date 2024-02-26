import { Link } from '../Link.jsx'
export default function HomePage(){
    return(
      <>
        <h1>Home</h1>
        <p>Esta es una pagina de ejemplo para crear un React Router desde cero.</p>
        <a href="https://git.io/streak-stats"><img src="https://streak-stats.demolab.com?user=arromero4&theme=dark&locale=es&fire=EB5454" alt="GitHub Streak" /></a>
        <Link to='/about'>Ir a Sobre nosotros.</Link>
      </>
    )
  }