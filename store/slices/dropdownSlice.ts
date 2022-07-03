import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface DropdownState {
  isOpen : boolean
}

const initialState = { isOpen : false } as DropdownState

const dropdownSlice = createSlice({
  name : "dropdown",
  initialState,
  reducers : {
    showDropdown(state){
      state.isOpen = true
    },
    closeDropdown(state){
      state.isOpen = false
    }
  }
})

export const {showDropdown, closeDropdown} = dropdownSlice.actions

//
export const dropdownSelector = (state: RootState) => state.dropdown;

export default dropdownSlice.reducer