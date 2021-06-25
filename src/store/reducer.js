import { createSlice } from '@reduxjs/toolkit'

export const imgListSlice = createSlice({
  name: 'imgList',
  initialState: {
    value: [],
  },
  reducers: {
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
    setImgList: (state, action) => {
        state.value = action.payload
    },
    delImgList: (state, action) => {
        state.value.splice(action.payload, 1)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setImgList, delImgList } = imgListSlice.actions

export default imgListSlice.reducer