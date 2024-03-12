import { createSlice } from "@reduxjs/toolkit";

export interface User{
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User{
  id: string;
}

const initialState: UserWithId[] = [
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


export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
})


export default usersSlice.reducer