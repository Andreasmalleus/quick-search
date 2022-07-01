import { createSlice } from '@reduxjs/toolkit'
import { Work } from '../../../types'
import { AppDispatch, RootState } from '../store'

interface WorksState {
  works : Work[],
  isLoading: boolean
  hasErrors: boolean
}

const initialState = { works : [], isLoading : false, hasErrors : false } as WorksState

const worksSlice = createSlice({
  name : "works",
  initialState,
  reducers : {
    setLoading(state){
      state.isLoading = true
    },
    setWorks(state, {payload}){
      state.isLoading = false;
      //Explicitly set works as array even if only an object is returned
      state.works = Array.isArray(payload) ? payload : [payload];
      state.hasErrors = false;
    },
    setError(state){
      state.isLoading = false;
      state.hasErrors = true
    },
    clearWorks(state){
      state.isLoading = false;
      state.works = []
      state.hasErrors = false;
    }
  }
})

export const {setLoading, setWorks, setError, clearWorks} = worksSlice.actions

//state selector
export const worksSelector = (state: RootState) => state.works

export default worksSlice.reducer

//thunk action creator
export const fetchWorksBySearchTerm = (searchTerm : string) => {
  //thunk action
  return async (dispatch : AppDispatch) => {
    try{
      const response = await fetch(`/api/work?keyword=${searchTerm}`)
      const data = await response.json();
      if(data?.work == undefined){
        dispatch(setError())
      }else{
        dispatch(setWorks(data.work))
      }
    }catch(err){
      console.log(err)
      dispatch(setError())
    }
  }
}