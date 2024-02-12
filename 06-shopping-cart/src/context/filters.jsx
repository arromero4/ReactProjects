import { createContext, useState } from "react";

//1. crear el contexto
// este es el que tenemos que consumir
export const FiltersContext = createContext()

//2. crear el provider que provee ese contexto
// este nos da o provee acceso al contexto
export function FiltersProvider({ children }){
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 250,
    })
    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters,
        }}>
            {children}
        </FiltersContext.Provider>
    )
}