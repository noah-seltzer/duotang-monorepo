import { configureStore } from '@reduxjs/toolkit'
import fileListSlice  from './fileListSlice'
import clientInfoSlice from './clientInfoSlice'

export const store = configureStore({
  reducer: {
    fileList: fileListSlice,
    clientInfo: clientInfoSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch