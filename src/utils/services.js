const urlApi = import.meta.env.VITE_API_URL
//console.log(urlApi)
/**
 * A collection of services used by the application.
 * Services Modules:
 * - user
 * - transactions
 * - datas
 */
export const services = {
    user: {
        /**
         * A function to log in a user with the provided username and password.
         *
         * @param {string} username - The username of the user.
         * @param {string} password - The password of the user.
         * @return {Object} An object containing user login information.
         */
        getLogin: async (username, password) => {
            const response = await fetch(urlApi + 'user/login', {
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
        /**
         * A description of the entire function.
         *
         * @param {String} token - description of parameter
         * @return {Object} An object containing the profile information.
         */
        getProfile: async (token) => {
            const response = await fetch(urlApi + 'user/profile', {
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
        /**
         * A description of the entire function.
         *
         * @param {String} token - description of parameter
         * @param {String} firstName - description of parameter
         * @param {String} lastName - description of parameter
         * @return {Object} description of return value
         */
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
            const response = await fetch(urlApi +'user/profile', objToSend)
            const data = await response.json()
            return data
        }
    },
    transactions: {
        /**
         * A description of the entire function.
         *
         * @param {String} token - description of parameter
         * @param {Number} accountId - description of parameter
         * @return {Object} An object containing the status, message, and transactions
         */
        getAllTransactions: async (token, accountId) => {
            const response = await fetch(urlApi + 'transactions/' + accountId, {
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
        },
    /**
     * Updates a transaction for a specific account.
     *
     * @param {string} token - The bearer token for authentication.
     * @param {string} accountId - The ID of the account.
     * @param {object} transaction - The transaction object to be updated.
     * @return {Promise<object>} An object containing the status, message, and transactions.
     * If the status is not 200, the transactions field will be null.
     * If the status is 200, the transactions field will contain the updated transaction.
     * If there is an unknown error, the status will be 0 and the transactions field will be null.
     */
        updateTransaction: async (token, accountId, transaction) => {
            const objToSend = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(transaction)
            }
            console.log(transaction)
            const response = await fetch(urlApi + 'transactions/' + accountId + '/' + transaction.id, objToSend)
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
    /**
     * Formats a given date into a string representation in the format "Month Day, Year".
     *
     * @param {string|number|Date} date - The date to be formatted. Can be a string representation of a date, a number representing the number of milliseconds since January 1, 1970 00:00:00 UTC, or a Date object.
     * @return {string} The formatted date string.
     */
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
        /**
         * A function that formats account transactions.
         *
         * @param {Transaction} accountTransaction - The account transactions to be formatted
         * @return {Array} The formatted array of transactions
         */
        formatTransactions: (accountTransaction) => {
            const transactionsArr = []
            if(accountTransaction)
            {
                accountTransaction.forEach(transaction => {
                transactionsArr.push({
                  id: transaction._id, 
                  accountId: transaction.accountId,
                  description: transaction.description,
                  amount: transaction.amount,
                  balance: transaction.balance,
                  date: services.data.formatDate(transaction.date),
                  dateOriginal: transaction.date,
                  type: transaction.type,
                  categorie: transaction.categorie,
                  note: transaction.note
                })
              })
            }
            return transactionsArr
        },
        /**
         * Formats the given number into a string with a fixed number of decimal places.
         *
         * @param {number} number - The number to be formatted.
         * @return {string} The formatted number string.
         */
        formatAmount: (number) => {
            return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
        },
        /**
         * Retrieves the account information based on the given account ID.
         *
         * @param {number|string} accountID - The ID of the account.
         * @return {Object|null} The account information object containing the name and available balance, or null if the account ID is not recognized.
         */
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
