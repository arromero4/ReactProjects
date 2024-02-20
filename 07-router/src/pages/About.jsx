import { Link } from '../Link.jsx'

const i18n = {
  es: {
    title: ' Sobre nosotros',
    button: 'Ir a la home',
    description: '¡Hola! Me llamo Andres y estoy creando un clon de React Router con midudev', 
  },
  en: {
    title: 'About us',
    button: 'Go to home',
    description: 'Hi! My name is Andres and I\'m creating a clone of React Router with midudev', 
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage({ routeParams }){
  const i18n = useI18n(routeParams.lang ?? 'es')
    return(
      <>
        <h1>{i18n.title}</h1>    
        <div>
          <img src="https://pbs.twimg.com/profile_images/1689487106521862144/43cC8lIo_400x400.jpg" alt="arromero491 profile picture" />
        <p>{i18n.description}</p>
        </div>
        <Link to='/'>{i18n.button}</Link>
      </>
    )
  }