import { createSlice } from '@reduxjs/toolkit'
import { Work } from '../../../types'
import { AppDispatch, RootState } from '../store'

interface WorksState {
  works : Work[];
  isLoading: boolean;
  isAppending: boolean;
  hasErrors: boolean;
  hasMore : boolean;
}

const initialState = { works : [], isLoading : false, hasErrors : false, hasMore : false, isAppending : false} as WorksState

const worksSlice = createSlice({
  name : "works",
  initialState,
  reducers : {
    setLoading(state){
      state.isLoading = true;
    },
    setWorks(state, {payload}){
      state.isLoading = false;
      //Explicitly set works as array even if only an object is returned
      state.works = Array.isArray(payload.work) ? payload.work : [payload.work];
      state.hasMore = payload.hasMore;
      state.hasErrors = false;
    },
    appendToWorks(state, {payload} ){
      //Payload can be either an array or just an object
      state.works = Array.isArray(payload.work) ? [...state.works, ...payload.work] : [...state.works, payload.work];
      state.hasMore = payload.hasMore
      state.hasErrors = false;
      state.isAppending = false;
    },
    setIsAppending(state){
      state.isAppending = true;
    },
    setError(state){
      state.isLoading = false;
      state.hasErrors = true;
      state.isAppending = false;
    },
    clearWorks(state){
      state.isLoading = false;
      state.isAppending = false;
      state.works = [];
      state.hasErrors = false;
    },
  }
})

export const {setLoading, setWorks, setError, clearWorks, appendToWorks, setIsAppending} = worksSlice.actions

//state selector
export const worksSelector = (state: RootState) => state.works

export default worksSlice.reducer

interface FetchWorksBySearchTermParams {
  searchTerm : string;
  cursor? : number;
  limit? : number;
}

//thunk action creator
export const fetchWorksBySearchTerm = ({searchTerm, cursor = 0, limit = 10} : FetchWorksBySearchTermParams) => {
  //thunk action
  return async (dispatch : AppDispatch) => {    
    try{
      const response = await fetch(`/api/work?keyword=${searchTerm}&cursor=${cursor}&limit=${limit}`)
      const data = await response.json();
      if(data?.work == undefined){
        dispatch(setError())
        return;
      }
      if(!cursor){
        dispatch(setWorks(data))
        return;
      }
      dispatch(appendToWorks(data))
    }catch(err){
      console.log(err)
      dispatch(setError())
    }
  }
}