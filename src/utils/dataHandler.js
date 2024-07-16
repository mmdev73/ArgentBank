
export const getLogin = async (username, password) => {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
    })
    const data = await response.json()
    if(data.status !== 200){
        return {
            status: data.status,
            message: data.message,
            token: null,
            rememberMe: false,
            userInfo: null
        }
    }

    if(data.status === 200){
        const userInfo = await getUserInfo(data.body.token)
        if(userInfo.status !== 200){
            return {
                status: userInfo.status,
                message: userInfo.message,
                token: null,
                rememberMe: false,
                userInfo: null
            }
        }
        return {
            status: data.status,
            message: data.message,
            token: data.body.token,
            rememberMe: false,
            userInfo: userInfo.userInfo
        }
    }

    return {
        status: 0,
        message: "Unkonwn Error",
        token: null,
        rememberMe: false,
        userInfo: null
    }
}

const getUserInfo = async (isAuthToken) => {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${isAuthToken}`,
        },
    })
    const data = await response.json()
    if(data.status !== 200){
        return {
            status: data.status,
            message: data.message,
            token: null,
            rememberMe: false,
            userInfo: null
        }
    }

    if(data.status === 200){
        return {
            status: data.status,
            message: data.message,
            token: isAuthToken,
            rememberMe: false,
            userInfo: data.body
        }
    }
    return {
        status: 0,
        message: "Unkonwn Error",
        token: null,
        rememberMe: false,
        userInfo: null
    }
}