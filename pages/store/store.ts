import { configureStore, combineReducers } from '@reduxjs/toolkit';
import worksSlice from './slices/worksSlice';
import dropdownSlice from './slices/dropdownSlice';
import {createLogger} from 'redux-logger'

const rootReducer = combineReducers({
  works : worksSlice,
  dropdown: dropdownSlice
})

const logger = createLogger({
  level : "info",
  collapsed: true,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
