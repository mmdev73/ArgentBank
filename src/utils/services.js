export const services = {
    user: {
        getLogin: async (username, password) => {
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
            if (data.status !== 200) {
                return {
                    status: data.status,
                    message: data.message,
                    token: null,
                    rememberMe: false,
                    userInfo: null
                }
            }

            if (data.status === 200) {
                const userInfo = await services.user.getProfile(data.body.token)
                if (userInfo.status !== 200) {
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
        },
        getProfile: async (token) => {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = await response.json()
            if (data.status !== 200) {
                return {
                    status: data.status,
                    message: data.message,
                    token: null,
                    rememberMe: false,
                    userInfo: null
                }
            }

            if (data.status === 200) {
                return {
                    status: data.status,
                    message: data.message,
                    token: token,
                    rememberMe: true,
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
        },
        updateProfile: async (token, firstName, lastName) => {
            const objToSend = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName
                })
            }
            const response = await fetch('http://localhost:3001/api/v1/user/profile', objToSend)
            const data = await response.json()
            return data
        }
    },
    transactions: {
        getAllTransactions: async (token, accountId) => {
            const response = await fetch('http://localhost:3001/api/v1/transactions/' + accountId, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = await response.json()
            if (data.status !== 200) {
                return {
                    status: data.status,
                    message: data.message,
                    transactions: null
                }
            }

            if (data.status === 200) {
                return {
                    status: data.status,
                    message: data.message,
                    transactions: data.body
                }
            }
            return {
                status: 0,
                message: "Unkonwn Error",
                transactions: null
            }
        }
    },
    data: {
        formatDate: (date) => {
            const dateObj = new Date(date);
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ];
              
              function getDayWithSuffix(day) {
                if (day > 3 && day < 21) return `${day}th`;
                switch (day % 10) {
                  case 1: return `${day}st`;
                  case 2: return `${day}nd`;
                  case 3: return `${day}rd`;
                  default: return `${day}th`;
                }
              }
              
              const month = months[dateObj.getUTCMonth()];
              const day = getDayWithSuffix(dateObj.getUTCDate());
              const year = dateObj.getUTCFullYear();
              
              const formattedDate = `${month} ${day}, ${year}`;
            return formattedDate
        },
        formatTransactions: (accountTransaction) => {
            const transactionsArr = []
            if(accountTransaction)
            {
                accountTransaction.forEach(transaction => {
                transactionsArr.push({
                  id: transaction.id, 
                  accountId: transaction.accountId,
                  description: transaction.description,
                  amount: transaction.amount,
                  balance: transaction.balance,
                  date: services.data.formatDate(transaction.date),
                  type: transaction.type,
                  categorie: transaction.categorie,
                  note: transaction.note
                })
              })
            }
            return transactionsArr
        },
        formatAmount: (number) => {
            return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
        },
        getAccountInfos: (accountID) => {
            switch (Number(accountID)) {
                case 6712:
                    return {
                        name: "Argent Bank Savings",
                        availableBalance: "$11,600.00"
                    }
                case 5201:
                    return {
                        name: "Argent Bank Credit Card",
                        availableBalance: "$4,829.58"
                    }
                case 8349:
                    return {
                        name: "Argent Bank Checking",
                        availableBalance: "$1,810.00"
                    }
                default:
                    return null
            }
        }
    }
}
