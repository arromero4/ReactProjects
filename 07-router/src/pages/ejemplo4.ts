function mostrarLongitud(objeto: number | string){
    if(typeof objeto === 'string'){
        return objeto.length
    }

    return objeto.toString().length
}

mostrarLongitud('1')

interface Mario{
    company: 'nintendo',
    nombre: string,
    saltar: () => void
}

interface Sonic{
    company: 'sega',
    nombre: string,
    correr: () => void
}

type Personaje = Mario | Sonic

//Type guard
function checkIsSonic(personaje: Personaje): personaje is Sonic{
    return (personaje as Sonic).correr === undefined
}

function jugar(personaje: Personaje){
        if(checkIsSonic(personaje)){
        personaje.correr()
    }else{
        personaje.saltar()
        return
    }

}

