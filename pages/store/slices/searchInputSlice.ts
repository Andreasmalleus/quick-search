import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface SearchInputState {
  searchTerm : string
}

const initialState = { searchTerm : "" } as SearchInputState

const searchInputSlice = createSlice({
  name : "searchInput",
  initialState,
  reducers : {
    setSearchTerm(state, {payload}){
      state.searchTerm = payload;
    }
  }
})

export const {setSearchTerm} = searchInputSlice.actions

export const searchInputSelector = (state: RootState) => state.searchInput;

export default searchInputSlice.reducer