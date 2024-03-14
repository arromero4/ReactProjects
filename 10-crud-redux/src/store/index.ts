import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer, { rollbackUser } from './users/slice'
import { toast } from "sonner";


const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()))


}

const syncWithDatabase: Middleware = store => next => action => {
  const  { type, payload } = action
  const previousState = store.getState()
  
  
  //fase 1
  next(action)
  if(type === 'users/deleteUserById') { //<--Delete user
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(user => user.id === userIdToRemove)
    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`,{
      method: 'DELETE',
    })
    .then(res => {
      if(res.ok) {
        toast.success(`User ${payload} deleted successfully`)
      }
      throw new Error('Error while deleting user')
    })
    .catch((err) => {
      toast.error(`Error deleting user ${userIdToRemove}`)
      if(userToRemove) store.dispatch(rollbackUser(userToRemove))
      console.log(err)
    })
  }

  //fase 2


}

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabase)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
