const a = 1
const b = 2 

const c = a + b

const obj = {
    name: 'pepe',
    age: 16,
}
obj.name

function suma(a: number, b: number){
    return a + b
}

suma(1,2)


type Hero = {
    readonly id?: `${string}-${string}-${string}-${string}-${string}`,
    name: string,
    age: number,
    isActive?: boolean,

}

// const hero: Hero = {
//     id: 1,
//     name: "Miles",
//     age: 21,
//     isActive: true,
// }

function createHero(hero: Hero): Hero{
    const { name, age } = hero;
    return {
        id: crypto.randomUUID(),
        name,
        age,
        isActive: true,
    }
}

const languages: string[] = []
const idiomas: Array<string> = []


//3 en raya
//matriz 3x3
type CellValue = 'x' | 'o' | ''
const gameBoard: [
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
] = [
    ['x','o','x'],
    ['x','o',''],
    ['x','','o'],

]

type RGB = readonly [number, number, number]
const black: RGB = [0,0,0]
const white: RGB = [255,255,255]

//Enums
const enum ERROR_TYPES {
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN,
}
 
function mostrarMensaje(tipoDeError: ERROR_TYPES){
    if(tipoDeError == ERROR_TYPES.NOT_FOUND){
        console.log('No se encuentran el recurso')
    } else if(tipoDeError == ERROR_TYPES.UNAUTHORIZED){
        console.log('No tienes permisos para acceder')
    } else if(tipoDeError == ERROR_TYPES.FORBIDDEN) {
        console.log('No tienes permisos para acceder')
    }
}



const canvas = document.getElementById('canvas');
//null sino lo encuentra
//HTMLElement si lo encuentra
// ??? como sabe typeScript que realmente estas recuperando un elemento 
// es inferencia -> TypeScript se da cuenta que dentro del if
// ya solo el canvas va apoder ser un HTMLCanvasElement
if(canvas !== null && canvas instanceof HTMLCanvasElement){
    const ctx = canvas.getContext('2d');
}
