import { configureStore } from '@reduxjs/toolkit'
import fileListSlice  from './fileListSlice'

export const store = configureStore({
  reducer: {
    fileList: fileListSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch