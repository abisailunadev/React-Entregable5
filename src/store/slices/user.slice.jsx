import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const userSlice = createSlice({
		name: 'user',
    initialState: '',
    reducers: {
      updateUser: (state, action) => {
        return action.payload
      }
    }
})

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;