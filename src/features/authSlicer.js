import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: false,
        userInfo: undefined,
        initialized: false
    },
    reducers: {
        /**
         * Log In function. Sets the token and the user information in the state.
         *
         * @param {Object} state - State. Initial state by default.
         * @param {Object} action - Action. Contain the payload.
         * @return {void} 
         */
        setLogin: (state = initialState, action) => {
            if (action.payload.token !== "null" && action.payload.token !== "undefined" && action.payload.token !== false) {
                state.token = action.payload.token
                if (action.payload.rememberMe) {
                    document.cookie = `token=${action.payload.token}; path=/; max-age=3600; SameSite=None; Secure`
                } else {
                    document.cookie = `token=null; path=/; max-age=-1; SameSite=None; Secure`
                }
                state.initialized = true
            } else {
                state.token = false
                document.cookie = `token=null; path=/; max-age=-1; SameSite=None; Secure`
                state.initialized = false
            }
        }, 
        /**
         * Log Out function. Removes the token and the user information from the state.
         *
         * @param {Object} state - State. Initial state by default.
         * @return {void} 
         */
        rmLogin: (state = initialState) => {
            state.token = false
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userI')
            document.cookie = `token=null; path=/; max-age=-1; SameSite=None; Secure`
            state.initialized = false
        },
        /**
         * Updates the user information in the state with the information from the action payload.
         *
         * @param {Object} state - The current state object.
         * @param {Object} action - The action object containing the payload.
         * @return {void} This function does not return anything.
         */
        setUserInfo: (state = initialState, action) => {
            //console.log(action)
            state.userInfo = action.payload.userInfo
            state.initialized = action.payload.initialized
        },
    },
})

export const { setLogin, rmLogin, setUserInfo } = authSlice.actions


export default authSlice.reducer