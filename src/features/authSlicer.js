import { createSlice } from '@reduxjs/toolkit'
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: false,
        userInfo: {}
    },
    reducers: {
        setLogin: (state = initialState, action) => {
            console.log(state)
            console.log(action)
            if (action.payload.token !== "null" && action.payload.token !== "undefined" && action.payload.token !== false) {
                state.token = action.payload.token
                if (action.payload.rememberMe) {
                    console.log('setLogin() called with rememberMe')
                    document.cookie = `token=${action.payload.token}; path=/; max-age=3600; SameSite=None; Secure`
                    console.log('---------------------------------------------')
                    console.log(document.cookie)
                    console.log('---------------------------------------------')
                } else {
                    console.log('setLogin() called without rememberMe')
                    document.cookie = `token=null; path=/; max-age=-1; SameSite=None; Secure`
                }
            } else {
                state.token = false
                document.cookie = `token=null; path=/; max-age=-1; SameSite=None; Secure`
            }
        },
        rmLogin: (state = initialState) => {
            state.token = false
            document.cookie = `token=null; path=/; max-age=-1; SameSite=None; Secure`
        },
        setUserInfo: (state = initialState, action) => {
            console.log('setuserInfo() called')
            state.userInfo = action.payload
        },
    },
})

export const { setLogin, rmLogin, setUserInfo } = authSlice.actions


export default authSlice.reducer