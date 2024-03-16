import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UserList } from './components/UsersList'
import { User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])
  // useRef para guardar un valor
  // que queremos que se comparta entre renderizados
  // pero que al cambiar, no vuelva a renderizar el componente
  

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)

  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const filteredUsers = useMemo(() => { 
    return filterCountry !== null && filterCountry.length > 0
  ? users.filter((user => {
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  }))
  : users
}, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    return sortByCountry 
    ?  filteredUsers.toSorted((a, b) => { //o [...users] una copia del array
      return a.location.country.localeCompare(b.location.country)
    }) 
    : filteredUsers
  }, [filteredUsers, sortByCountry])

  return (
    <>
      <h1>Prueba técnica.</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear Filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por País' : 'Ordernar por País'}
        </button>
        <button onClick={handleReset}>
          Resetear Estado
        </button>
        <input type="text" placeholder='Filtra por país' onChange={(e) =>{
          setFilterCountry(e.target.value);
        }}/>     
      </header>
      <main>
        <UserList 
          deleteUser = {handleDelete}
          showColors={showColors} 
          users={sortedUsers} />
      </main>
    </>
  )
}

export default App
