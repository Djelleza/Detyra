import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interface/TaskUserInterface';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null; 
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null; 
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload; 
    },
  },
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;
export default userSlice.reducer;
