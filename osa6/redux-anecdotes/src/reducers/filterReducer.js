import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      return action.payload
    },
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer