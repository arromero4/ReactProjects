import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE =  [
  {
    id: "1",
    name: "Andres Romero",
    email: "arromero0408@gmail.com",
    github: "arromero4",
  },
  {
    id: "2",
    name: "John Doe",
    email: "leo@gmail.com",
    github: "leo",
  },
  {
    id: "3",
    name: "Miguel Angel Duran",
    email: "midudev@gmail.com",
    github: "midudev",
  },
]

export type UserId = string

export interface User{
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User{
  id: UserId;
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("__redux__state__")
  if(persistedState){
    return JSON.parse(persistedState).users
  }
  return DEFAULT_STATE
})()


export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {

      const id = crypto.randomUUID()
      state.push({ id, ...action.payload})
 
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.find((user) => user.id === action.payload.id)
      if(!isUserAlreadyDefined){
        state.push(action.payload)
      }
    }
  },

})


export default usersSlice.reducer
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions