import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blog",
    initialState:{
        loading: false,
        blog: [],
        ownBlogs: [],
        logout: null
    },
    reducers:{
        //actions 
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setBlog:(state, action) => {
            state.blog = action.payload;
        },
        setOwnBlogs: (state, action) => {
            state.ownBlogs = action.payload;
        },
        logout:(state) => {
            state.user = null;
        },
    }
})

export const {setLoading, setBlog,  setOwnBlogs, logout} = blogSlice.actions;
export default blogSlice.reducer;