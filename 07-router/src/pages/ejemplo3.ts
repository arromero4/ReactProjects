interface Producto {
    id: number,
    nombre: string,
    precio: number,
    quantity: number,
}

interface Zapatilla extends Producto {
    talla: number,
}

interface CarritoDECompras{
    totalPrice: number,
    productos: (Producto | Zapatilla)[]

}

interface CarritoOps{
    add(product: Producto): void,
    remove(id: number): void,
    clear: () => void,    
}

const carrito: CarritoDECompras = {
    totalPrice: 100,
    productos: [
        {
            id: 0,
            nombre: 'Crema',
            precio: 30,
            quantity: 1,
            talla: 5,
        }
    ]
}