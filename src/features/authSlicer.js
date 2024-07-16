import { createSlice } from '@reduxjs/toolkit'

//const sessionStorage = window.sessionStorage
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: false,
        userInfo: undefined
    },
    reducers: {
        setLogin: (state = initialState, action) => {
            if (action.payload.token !== "null" && action.payload.token !== "undefined" && action.payload.token !== false) {
                state.token = action.payload.token
                if (action.payload.rememberMe) {
                    document.cookie = `token=${action.payload.token}; path=/; max-age=3600; SameSite=None; Secure`
                } else {
                    document.cookie = `token=null; path=/; max-age=-1; SameSite=None; Secure`
                }
            } else {
                state.token = false
                document.cookie = `token=null; path=/; max-age=-1; SameSite=None; Secure`
            }
        }, 
        rmLogin: (state = initialState) => {
            state.token = false
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userI')
            document.cookie = `token=null; path=/; max-age=-1; SameSite=None; Secure`
        },
        setUserInfo: (state = initialState, action) => {
            state.userInfo = action.payload.userInfo
        },
    },
})

export const { setLogin, rmLogin, setUserInfo } = authSlice.actions


export default authSlice.reducer