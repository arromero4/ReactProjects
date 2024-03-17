/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react'
import './App.css'
import { UserList } from './components/UsersList'
import { SortBy, type User } from './types.d'
import { useUsers } from './hooks/useUsers'
import { Results } from './components/Results'




//PRUEBA TECNICA B - CON REACT QUERY
function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)


  //const originalUsers = useRef<User[]>([])
  // useRef para guardar un valor
  // que queremos que se comparta entre renderizados
  // pero que al cambiar, no vuelva a renderizar el componente


  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)

  }

  const handleReset =() => {    //setUsers(originalUsers.current)
    void refetch()
  }

  const handleDelete = (email: string) => {
    //const filteredUsers = users.filter((user) => user.email !== email)
    //setUsers(filteredUsers)

  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }



  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((item) => {

      })((user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      }))
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last

    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localCompare(extractProperty(b))
    })

  }, [filteredUsers, sorting])

  return (
    <>
      <h1>Prueba técnica.</h1>
      <Results />
      <header>
        <button onClick={toggleColors}>
          Colorear Filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por País' : 'Ordernar por País'}
        </button>
        <button onClick={handleReset}>
          Resetear Estado
        </button>
        <input type="text" placeholder='Filtra por país' onChange={(e) => {
          setFilterCountry(e.target.value);
        }} />
      </header>
      <main>
        {!isLoading && !isError && users.length > 0 &&
          <UserList
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
            changeSorting={handleChangeSort}
          />}
        {isLoading && <p>Cargando...</p>}

        {isError && <p>Ha habido un error</p>}

        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}



        {!isLoading && !isError && hasNextPage === true &&  <button onClick={() => {void fetchNextPage()}}>Cargar más resultados</button>}
        
        {!isLoading && !isError && hasNextPage === false  && <p>No hay más usuarios</p>}

      </main>
    </>
  )
}

export default App
